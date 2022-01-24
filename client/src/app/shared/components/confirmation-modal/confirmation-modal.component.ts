import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmationModal } from '../../interfaces/confirmation-modal.interface';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
    public isLoading: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: IConfirmationModal,
        private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    ) { }

    ngOnInit(): void {
    }

    public close(): void {
        this.dialogRef.close(false);
    }

    public onSubmit(): void {
        this.data.callBack(this.data.id);
    }

}
