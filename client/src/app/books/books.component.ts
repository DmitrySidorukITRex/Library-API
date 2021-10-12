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
import { IUserApi, IUserBook } from '../shared/interfaces/user.interface';
import { ToastService } from '../shared/services/toast.service';
import { UserBookService } from '../shared/services/user-book.service';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { BookAvailability, BookTableFiltersValue } from './books.enum';
import { IBook } from './books.interface';
import { BooksService } from './books.service';
import { TakeBookModalComponent } from './take-book-modal/take-book-modal.component';

@UntilDestroy()
@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
    public books: IBook[] = [];
    public displayedColumns: string[] = ['name', 'originalName', 'author', 'originalAuthor', 'category', 'availability', 'actions'];
    public dataSource: MatTableDataSource<IBook> = new MatTableDataSource(undefined);
    public isLoading: boolean = false;
    public filterFields: ITableFilter[] = [
        {value: BookTableFiltersValue.author, name: 'Author'},
        {value: BookTableFiltersValue.category, name: 'Category'},
        {value: BookTableFiltersValue.availability, name: 'Availability'}
    ];
    public filterValues: Set<string> = new Set();
    public isFilterOpened: boolean = false;
    public isAdmin: boolean = false;
    public user: IUserApi;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private readonly booksService: BooksService,
        private readonly dialog: MatDialog,
        private readonly toastService: ToastService,
        private readonly authService: AuthService,
        private readonly userBookService: UserBookService
    ) {
        this.isAdmin = this.authService.getAdmin();
    }

    ngOnInit(): void {
        this.getUser();
        this.getData();
    }

    get getManageFilterText(): string {
        return this.isFilterOpened ? 'Remove Filter' : 'Add Filter';
    }

    public getStringNameFromArray(array: string[]): string {
        return array.join(', ');
    }

    public isTakeBookDisabled(book: IBook): boolean {
        let countCondition: boolean;
        if (book.availability.some(x => x === BookAvailability.inTheRoom)) {
            countCondition = this.user?.books.filter(x => !x.isTakeAway).length >= 10;
        } else {
            countCondition = this.user?.books.filter(x => x.isTakeAway).length >= 3;
        }
        return countCondition || this.user?.books.some(x => x.id === book._id);
    }

    public isReturnBookDisabled(book: IBook): boolean {
        return !this.user?.books.some(x => x.id === book._id);
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
        const books = this.dataSource.data.map(x => ({category: x.category, author: x.author, availability: x.availability}));
        if (filterFieldName === BookTableFiltersValue.category) {
            let arr: string[] = [];
            books.forEach(book => {
                arr = arr.concat(book.category);
            });
            this.filterValues = new Set(arr);
        } else if (filterFieldName === BookTableFiltersValue.availability) {
            let arr: string[] = [];
            books.forEach(book => {
                arr = arr.concat(book.availability);
            });
            this.filterValues = new Set(arr);
        } else {
            this.filterValues = new Set(books.map(x => x[filterFieldName as keyof {}]));
        }
    }

    public onApplyFilter(filterSettings: ITableFilterSettings[]): void {
        filterSettings.forEach(setting => {
            const allBooks = this.dataSource.data.length && filterSettings.length > 1 ? this.dataSource.data : this.books;
            if (setting.field === BookTableFiltersValue.category) {
                this.dataSource.data = allBooks.filter(x => setting.value.some(y => x.category.includes(y)));
            } else if (setting.field === BookTableFiltersValue.availability) {
                this.dataSource.data = allBooks.filter(x => setting.value.some(y => x.availability.includes(y)));
            } else if (setting.field === BookTableFiltersValue.author) {
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
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            width: '400px',
            data: {
                title: 'Delete Book',
                text: 'Are you sure you want to delete the book?',
                id: id,
                callBack: this.removeBook.bind(this)
            }
        });
    }

    public onTakeBook(book: IBook): void {
        const dialogRef = this.dialog.open(TakeBookModalComponent, {
            width: '600px',
            data: {
                book,
                callBack: this.takeBook.bind(this)
            }
        });

        this.afterModalClosed(dialogRef, 'took');
    }

    public onReturnBook(book: IBook): void {
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            width: '400px',
            data: {
                title: 'Return Book',
                text: `Are you sure you want to return the ${book.name}?`,
                id: book._id,
                callBack: this.returnBook.bind(this)
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

    private getUser(): void {
        this.userBookService.getUserById(this.authService.getUserId())
            .pipe(untilDestroyed(this))
            .subscribe(user => this.user = user);
    }

    private removeBook(id: string): void {
        this.booksService.removeBook(id)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.dialog.closeAll();
                this.toastService.open('The book has been successfully removed.');
                this.getData();
            }, err => this.toastService.open(err.error.message, ToastTypes.Error));
    }

    private takeBook(book: IBook, isTakeAway: boolean): void {
        const user = JSON.parse(JSON.stringify(this.user));
        const newBook: IUserBook = {
            name: book.name,
            id: book._id,
            isTakeAway: isTakeAway,
            takingTime: new Date()
        };

        this.userBookService.takeUserBook(user._id, newBook)
            .subscribe(user => {
                this.user = user;
                this.toastService.open('The book has been successfully took.');
                this.dialog.closeAll();
            }, err => this.toastService.open(err.error.message, ToastTypes.Error));
    }

    private returnBook(id: string): void {
        const user: IUserApi = JSON.parse(JSON.stringify(this.user));
        user.books = user.books.filter(x => x.id !== id);

        this.userBookService.returnUserBook(this.user._id, user.books)
            .pipe(untilDestroyed(this))
            .subscribe(user => {
                this.user = user;
                this.dialog.closeAll();
                this.toastService.open('The book has been successfully returned.');
            }, err => this.toastService.open(err.error.message, ToastTypes.Error));
    }

    private afterModalClosed(dialogRef: MatDialogRef<any, any>, action: string): void {
        dialogRef.afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(
                result => {
                    if (result) {
                        this.getData();
                        this.toastService.open(`The book has been successfully ${action}.`)
                    }
                },
                err => this.toastService.open(err.error.message, ToastTypes.Error)
            );
    }

}
