import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { ContactsComponent } from './contacts.component';

@NgModule({
  declarations: [ContactsComponent],
  imports: [CommonModule, AngularYandexMapsModule],
})
export class ContactsModule {}
