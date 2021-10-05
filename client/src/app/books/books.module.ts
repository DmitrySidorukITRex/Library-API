import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from "@angular/forms";
import { BooksComponent } from "./books.component";
import { BooksService } from "./books.service";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        BooksComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatInputModule,
        MatButtonModule,
        SharedModule
    ],
    providers: [
        BooksService
    ]
})
export class BooksModule { }