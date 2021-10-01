import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BooksComponent } from "./books.component";

@NgModule({
    declarations: [
        BooksComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    providers: [
    ]
})
export class BooksModule { }