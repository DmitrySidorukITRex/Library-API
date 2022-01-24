import { Component, OnInit } from '@angular/core';
import { Address } from './contacts.interface';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  public addresses: Address[] = [
    {
      street: 'Ленина',
      house: 5,
      phone: '+375 (44) 5-576-637',
      firstWorkingDay: 'Monday',
      lastWorkingDay: 'Sunday',
      openingTime: '09:00',
      closingTime: '21:00',
      lat: 53.901515,
      lng: 27.558426,
    },
    {
      street: 'Петра Мстиславца',
      house: 11,
      phone: '+375 (44) 5-597-445',
      firstWorkingDay: 'Monday',
      lastWorkingDay: 'Sunday',
      openingTime: '10:00',
      closingTime: '22:00',
      lat: 53.933698,
      lng: 27.652534,
    },
    {
      street: 'Притыцкого',
      house: 146,
      phone: '+375 (44) 5-597-445',
      firstWorkingDay: 'Monday',
      lastWorkingDay: 'Sunday',
      openingTime: '09:00',
      closingTime: '21:00',
      lat: 53.907541,
      lng: 27.437387,
    },
    {
      street: 'Победителей',
      house: 9,
      phone: '+375 (44) 5-576-637',
      firstWorkingDay: 'Monday',
      lastWorkingDay: 'Sunday',
      openingTime: '10:00',
      closingTime: '22:00',
      lat: 53.90857,
      lng: 27.548608,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
