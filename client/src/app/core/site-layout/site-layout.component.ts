import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
})
export class SiteLayoutComponent implements OnInit {
  public isAdmin: boolean;

  constructor(private readonly authService: AuthService) {
    this.isAdmin = this.authService.getAdmin();
  }

  ngOnInit(): void {}
}
