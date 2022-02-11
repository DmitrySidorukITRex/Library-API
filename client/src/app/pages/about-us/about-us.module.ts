import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { AboutUsComponent } from './about-us.component';
import { AboutUsService } from './about-us.service';

@NgModule({
  declarations: [AboutUsComponent],
  imports: [CommonModule, AngularYandexMapsModule, YouTubePlayerModule],
  providers: [AboutUsService],
})
export class AboutUsModule {}
