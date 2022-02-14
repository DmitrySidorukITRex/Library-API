import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { TokenInterceptor } from './token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatListModule } from '@angular/material/list';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [SiteLayoutComponent],
  imports: [
    CommonModule,
    AuthModule,
    AppRoutingModule,
    MatListModule,
    TranslocoModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
  ],
})
export class CoreModule {}
