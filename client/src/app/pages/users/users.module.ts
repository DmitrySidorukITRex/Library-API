import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { PenaltyModalComponent } from './penalty-modal/penalty-modal.component';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { UsersState } from './state/users.state';

@NgModule({
  declarations: [UsersComponent, AddEditUserComponent, PenaltyModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
      },
    ]),
    NgxsModule.forFeature([UsersState]),
  ],
  providers: [UsersService],
})
export class UsersModule {}
