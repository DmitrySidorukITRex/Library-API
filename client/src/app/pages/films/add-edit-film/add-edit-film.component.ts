import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { forkJoin } from 'rxjs';
import { NewFilm } from '../films.interface';
import { FilmsService } from '../films.service';

@UntilDestroy()
@Component({
  selector: 'app-add-edit-film',
  templateUrl: './add-edit-film.component.html',
  styleUrls: ['./add-edit-film.component.scss'],
})
export class AddEditFilmComponent implements OnInit {
  public isEditing: boolean = false;
  public isLoading: boolean = false;
  public filmForm: FormGroup;

  private posterFile: File;
  private filmFile: File;
  private filmName: string;

  constructor(
    private dialogRef: MatDialogRef<AddEditFilmComponent>,
    private readonly filmsService: FilmsService
  ) {
    this.filmForm = new FormGroup({
      title: new FormControl('', Validators.required),
      idkp: new FormControl('', Validators.required),
      poster: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.filmForm.controls;
  }

  get title(): string {
    return this.isEditing ? 'Edit Film' : 'Add Film';
  }

  public close(): void {
    this.dialogRef.close(false);
  }

  public onSave(): void {
    this.isLoading = true;
    this.isEditing ? this.updateFilm() : this.addFilm();
  }

  public fileBrowseHandler(event: any): void {
    this.filmFile = event.target.files[0];
    this.filmName = this.filmFile.name;
    // this.uploadFilesSimulator(0);
  }

  public formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  public onFileSelected(event: any): void {
    this.posterFile = event.target.files[0];
  }

  // private uploadFilesSimulator(index: number): void {
  //   setTimeout(() => {
  //     if (index === this.files.length) {
  //       return;
  //     } else {
  //       const progressInterval = setInterval(() => {
  //         if (this.files[index].progress === 100) {
  //           clearInterval(progressInterval);
  //           this.uploadFilesSimulator(index + 1);
  //         } else {
  //           this.files[index].progress += 5;
  //         }
  //       }, 200);
  //     }
  //   }, 1000);
  // }

  private addFilm(): void {
    this.isLoading = true;
    const requests = [
      this.filmsService.addNewFilm(this.getNewFilmModel()),
      this.filmsService.uploadFilm(this.filmFile, this.f.idkp.value),
    ];

    forkJoin(requests)
      .pipe(untilDestroyed(this))
      .subscribe(([newFilm, filmFile]) => {
        this.isLoading = false;
        this.dialogRef.close(true);
      });
  }

  private getNewFilmModel(): NewFilm {
    return {
      title: this.f.title.value,
      idkp: this.f.idkp.value,
      poster: this.posterFile,
      filmName: this.filmName,
    };
  }

  private updateFilm(): void {}
}
