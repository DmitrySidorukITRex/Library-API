import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { TableFilterComponent } from './components/table-filter/table-filter.component';
import { ToastService } from './services/toast.service';
import { UserBookService } from './services/user-book.service';


@NgModule({
    declarations: [
        TableFilterComponent,
        ConfirmationModalComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    providers: [
        ToastService,
        UserBookService
    ],
    exports: [
        TableFilterComponent
    ]
})
export class SharedModule { }
