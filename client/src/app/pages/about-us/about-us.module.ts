import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { AboutUsComponent } from './about-us.component';
import { AboutUsService } from './about-us.service';

@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    AngularYandexMapsModule,
    YouTubePlayerModule,
    RouterModule.forChild([
      {
        path: '',
        component: AboutUsComponent,
      },
    ]),
  ],
  providers: [AboutUsService],
})
export class AboutUsModule {}
