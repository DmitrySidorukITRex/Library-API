import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { ContactsComponent } from './contacts.component';

@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    AngularYandexMapsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContactsComponent,
      },
    ]),
  ],
})
export class ContactsModule {}
