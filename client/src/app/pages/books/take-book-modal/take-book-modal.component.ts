import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { IBook } from '../books.interface';

@UntilDestroy()
@Component({
    selector: 'app-take-book-modal',
    templateUrl: './take-book-modal.component.html',
    styleUrls: ['./take-book-modal.component.scss']
})
export class TakeBookModalComponent implements OnInit {
    public control = new FormControl('', Validators.required);

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {book: IBook, callBack: (book: IBook, isTakeAway: boolean) => {}},
        private dialogRef: MatDialogRef<TakeBookModalComponent>
    ) { }

    ngOnInit(): void {
    }

    public close(): void {
        this.dialogRef.close(false);
    }

    public onTake(): void {
        const isTakeAway = this.control.value === 'Takeaway';
        this.data.callBack(this.data.book, isTakeAway);
    }

}
