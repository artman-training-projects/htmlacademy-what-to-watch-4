export interface Comment {
  id: number;
  user: {
    id: number;
    name: string;
  };
  comment: string;
  date: string;
  rating: number;
}

export type Comments = Comment[];

export interface Film {
  id: number;
  title: string;
  poster: string;
  previewImg: string;
  bg: string;
  bgc: string;
  src: string;
  previewSrc: string;
  description: string;
  rating: number;
  votes: number;
  director: string;
  starring: string[];
  time: number;
  genre: string;
  year: number;
  isFavorite: boolean,
}

export type Films = Film[];

export interface User {
  avatarSrc: string;
  email: string;
  id: number;
  name: string;
}
