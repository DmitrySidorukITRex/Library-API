import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AboutUsService } from './about-us.service';

interface Video {
  title: string;
  link: string;
}

@UntilDestroy()
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  public videoList: Video[] = [
    {
      title: '[Debugging] Expression has changed after it was checked',
      link: 'https://www.youtube.com/watch?v=SwPNhB57iQ4',
    },
    {
      title: '[Debugging] The pipe {name} could not be found',
      link: 'https://www.youtube.com/watch?v=XjBMLujR9ng',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    // this.getVideos();
    this.appendIframeApi();
  }

  public getVideoId(video: Video): string {
    const params = new URL(video.link).searchParams;
    return params.get('v') || '';
  }

  // public getVideos(): void {
  //   this.aboutUsService
  //     .getAllVideos()
  //     .pipe(untilDestroyed(this))
  //     .subscribe((videos) => {
  //       console.log(videos);
  //     });
  // }

  private appendIframeApi(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }
}
