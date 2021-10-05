import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { TableFilterComponent } from './components/table-filter/table-filter.component';
import { ToastService } from './services/toast.service';


@NgModule({
    declarations: [
        TableFilterComponent,
        ConfirmationModalComponent
    ],
    imports: [
        CommonModule,
        MatSnackBarModule,
        MatSelectModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule
    ],
    providers: [
        ToastService
    ],
    exports: [
        TableFilterComponent
    ]
})
export class SharedModule { }
