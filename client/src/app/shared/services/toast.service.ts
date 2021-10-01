import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ToastTypes } from "../enums/enum";

@Injectable()
export class ToastService {
    constructor(
        private snackBar: MatSnackBar
    ) {}

    public open(message: string, action = ToastTypes.Success) {
        this.snackBar.open(message, action, { duration: 4000, horizontalPosition: 'right', verticalPosition: 'top' });
    }
}