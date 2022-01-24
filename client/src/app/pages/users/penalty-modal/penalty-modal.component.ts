import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IUserApi } from 'src/app/shared/interfaces/user.interface';
import { UsersService } from '../users.service';

@UntilDestroy()
@Component({
    selector: 'app-penalty-modal',
    templateUrl: './penalty-modal.component.html',
    styleUrls: ['./penalty-modal.component.scss']
})
export class PenaltyModalComponent implements OnInit {
    public penaltyControl: FormControl;
    public isLoading: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {user: IUserApi},
        private dialogRef: MatDialogRef<PenaltyModalComponent>,
        private readonly usersService: UsersService
    ) {
        const penalty = this.getPenaltyInSeconds(this.data.user.penaltyDueDate);
        this.penaltyControl = new FormControl(penalty);
    }

    ngOnInit(): void {
    }

    public close(): void {
        this.dialogRef.close(false);
    }

    public onSave(): void {
        this.isLoading = true;
        const currentDate = new Date();
        currentDate.setSeconds(this.penaltyControl.value);
        const user = {
            ...this.data.user,
            penaltyDueDate: currentDate.toString()
        };
        this.usersService.updateUser(this.data.user._id, user)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.isLoading = false;
                this.dialogRef.close(true);
            });
    }

    private getPenaltyInSeconds(penaltyDueDate: string): number {
        return new Date(penaltyDueDate).getTime() - new Date().getTime() > 0
            ? Math.round((new Date(penaltyDueDate).getTime() - new Date().getTime()) / 1000) : 0;
    }

}
