import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IUserApi } from 'src/app/shared/interfaces/user.interface';
import { UsersService } from '../users.service';

@UntilDestroy()
@Component({
    selector: 'app-add-edit-user',
    templateUrl: './add-edit-user.component.html',
    styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
    public userForm: FormGroup;
    public isLoading: boolean = false;
    public isEditing: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {user: IUserApi},
        private dialogRef: MatDialogRef<AddEditUserComponent>,
        private usersService: UsersService
    ) {
        this.isEditing = !!data?.user;
        this.userForm = new FormGroup({
            email: new FormControl(data?.user.email || '', [Validators.required, Validators.email]),
            name: new FormControl(data?.user.name || '', Validators.required),
            lastName: new FormControl(data?.user.lastName || '', Validators.required),
            address: new FormControl(data?.user.address || '', Validators.required),
            isAdmin: new FormControl(data?.user.isAdmin || false)
        });
    }

    ngOnInit(): void {
    }

    get f() {
        return this.userForm.controls;
    }

    public close(): void {
        this.dialogRef.close(false);
    }

    public onSave(): void {
        this.isLoading = true;
        this.isEditing ? this.updateUser() : this.createUser();
    }

    public createUser(): void {
        this.usersService.createUser(this.getUserModel())
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.isLoading = false;
                this.dialogRef.close(true);
            });
    }

    public updateUser(): void {
        this.usersService.updateUser(this.data.user._id, this.getUserModel())
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.isLoading = false;
                this.dialogRef.close(true);
            })
    }

    private getUserModel(): IUserApi {
        return {
            email: this.f.email.value,
            name: this.f.name.value,
            lastName: this.f.lastName.value,
            address: this.f.address.value,
            isAdmin: this.f.isAdmin.value,
            books: [],
            penalty: 0,
            _id: this.data?.user._id
        }
    }

}
