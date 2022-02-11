export interface NewFilm {
  idkp: string;
  title: string;
  poster: File;
  filmName: string;
}

export interface FilmApi {
  _id: string;
  idkp: string;
  imageSrc: string;
  title: string;
  videoSrc: string;
}
