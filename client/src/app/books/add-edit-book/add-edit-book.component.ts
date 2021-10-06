import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IBook, ICreateBook } from '../books.interface';
import { BooksService } from '../books.service';

@UntilDestroy()
@Component({
    selector: 'app-add-edit-book',
    templateUrl: './add-edit-book.component.html',
    styleUrls: ['./add-edit-book.component.scss']
})
export class AddEditBookComponent implements OnInit {
    public bookForm: FormGroup;
    public isEditing: boolean = false;
    public isLoading: boolean = false;
    public categoryList: string[] = [
        'Novel',
        'Fantasy',
        'Historical',
        'Adventure'
    ];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {book: IBook},
        private dialogRef: MatDialogRef<AddEditBookComponent>,
        private readonly booksService: BooksService
    ) {
        this.isEditing = !!data?.book;
        this.bookForm = new FormGroup({
            name: new FormControl(data?.book.name || '', Validators.required),
            originalName: new FormControl(data?.book.originalName || ''),
            author: new FormControl(data?.book.author || '', Validators.required),
            originalAuthor: new FormControl(data?.book.originalAuthor || ''),
            annotation: new FormControl(data?.book.annotation || '', Validators.required),
            category: new FormControl(data?.book.category || [], Validators.required),
        });
    }

    ngOnInit(): void {
    }

    get f() {
        return this.bookForm.controls;
    }

    get title(): string {
        return this.isEditing ? 'Edit Book' : 'Add Book';
    }

    public close(): void {
        this.dialogRef.close(false);
    }

    public onSave(): void {
        this.isLoading = true;
        this.isEditing ? this.updateBook() : this.createBook();
    }

    private createBook(): void {
        this.booksService.createBook(this.bookForm.value)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.isLoading = false;
                this.dialogRef.close(true);
            });
    }

    private updateBook(): void {
        this.booksService.updateBook(this.data.book._id, this.getBookModel())
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.isLoading = false;
                this.dialogRef.close(true);
            });
    }

    private getBookModel(): ICreateBook {
        return {
            name: this.f.name.value,
            author: this.f.author.value,
            originalName: this.f.originalName.value,
            originalAuthor: this.f.originalAuthor.value,
            category: this.f.category.value,
            annotation: this.f.annotation.value
        }
    }

}
