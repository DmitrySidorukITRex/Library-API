import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastService } from './services/toast.service';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatSnackBarModule
    ],
    providers: [
        ToastService
    ]
})
export class SharedModule { }
