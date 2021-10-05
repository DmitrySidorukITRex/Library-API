import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';

@NgModule({
    declarations: [
        UsersComponent,
        AddEditUserComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        MatCheckboxModule,
        MatMenuModule
    ],
    providers: [
        UsersService
    ]
})
export class UsersModule { }
