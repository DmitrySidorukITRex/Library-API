import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { BooksComponent } from "./books.component";
import { BooksService } from "./books.service";

@NgModule({
    declarations: [
        BooksComponent,
        AddEditBookComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule
    ],
    providers: [
        BooksService
    ]
})
export class BooksModule { }