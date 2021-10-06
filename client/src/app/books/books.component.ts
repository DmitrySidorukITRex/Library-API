import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from '../core/auth/auth.service';
import { ConfirmationModalComponent } from '../shared/components/confirmation-modal/confirmation-modal.component';
import { ToastTypes } from '../shared/enums/enum';
import { ITableFilter, ITableFilterSettings } from '../shared/interfaces/table-filter.interface';
import { ToastService } from '../shared/services/toast.service';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { IBook } from './books.interface';
import { BooksService } from './books.service';

@UntilDestroy()
@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
    public books: IBook[] = [];
    public displayedColumns: string[] = ['name', 'author', 'category'];
    public dataSource: MatTableDataSource<IBook> = new MatTableDataSource(undefined);
    public isLoading: boolean = false;
    public filterFields: ITableFilter[] = [{value: 'author', name: 'Author'}, {value: 'category', name: 'Category'}];
    public filterValues: Set<string> = new Set();
    public isFilterOpened: boolean = false;
    public isAdmin: boolean = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private readonly booksService: BooksService,
        private readonly dialog: MatDialog,
        private readonly toastService: ToastService,
        private readonly authService: AuthService
    ) {
        this.isAdmin = this.authService.getAdmin();
        if (this.isAdmin) {
            this.displayedColumns.push('actions');
        }
    }

    ngOnInit(): void {
        this.getData();
    }

    get getManageFilterText(): string {
        return this.isFilterOpened ? 'Remove Filter' : 'Add Filter';
    }

    public getCategoriesName(categories: string[]): string {
        return categories.join(', ');
    }

    public searchByName(event: Event): void {
        const searchString = (event.target as HTMLInputElement).value;
        const books = this.books.filter(x => x.name.startsWith(searchString));
        this.dataSource.data = books;
    }

    public manageFilter(): void {
        this.isFilterOpened = !this.isFilterOpened;
    }

    public onSelectFilterField(filterFieldName: string): void {
        const books = this.dataSource.data.map(x => ({category: x.category, author: x.author}));
        if (filterFieldName === 'category') {
            let arrForCategories: string[] = [];
            books.forEach(book => {
                arrForCategories = arrForCategories.concat(book.category);
            });
            this.filterValues = new Set(arrForCategories);
        } else {
            this.filterValues = new Set(books.map(x => x[filterFieldName as keyof {}]));
        }
    }

    public onApplyFilter(filterSettings: ITableFilterSettings[]): void {
        filterSettings.forEach(setting => {
            const allBooks = this.dataSource.data.length && filterSettings.length > 1 ? this.dataSource.data : this.books;
            if (setting.field === 'category') {
                this.dataSource.data = allBooks.filter(x => setting.value.some(y => x.category.includes(y)));
            } else if (setting.field === 'author') {
                this.dataSource.data = allBooks.filter(x => setting.value.includes(x.author));
            }
        });
    }

    public onResetFilter(): void {
        this.dataSource.data = this.books;
    }

    public onAddBook(): void {
        const dialogRef = this.dialog.open(AddEditBookComponent, {
            width: '600px'
        });

        this.afterModalClosed(dialogRef, 'created');
    }

    public onEditBook(id: string): void {
        const book = this.books.find(x => x._id === id);
        const dialogRef = this.dialog.open(AddEditBookComponent, {
            width: '600px',
            data: {
                book
            }
        });

        this.afterModalClosed(dialogRef, 'updated');
    }

    public onRemoveBook(id: string): void {
        const book = this.books.find(x => x._id === id);
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            width: '400px',
            data: {
                title: 'Delete Book',
                text: 'Are you sure you want to delete the book?',
                id: book?._id,
                callBack: this.removeBook.bind(this)
            }
        });
    }

    private getData(): void {
        this.isLoading = true;
        this.booksService.getAllBooks()
            .pipe(untilDestroyed(this))
            .subscribe(books => {
                this.books = books;
                this.dataSource = new MatTableDataSource(books);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.isLoading = false;
            });
    }

    private removeBook(id: string): void {
        this.booksService.removeBook(id)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.dialog.closeAll();
                this.toastService.open('The book has been successfully removed.')
                this.getData();
            }, err => this.toastService.open(err.error.message, ToastTypes.Error));
    }

    private afterModalClosed(dialogRef: MatDialogRef<AddEditBookComponent, any>, action: string): void {
        dialogRef.afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(
                result => {
                    if (result) {
                        this.getData();
                        this.toastService.open(`The user has been successfully ${action}.`)
                    }
                },
                err => this.toastService.open(err.error.message, ToastTypes.Error)
            );
    }

}
