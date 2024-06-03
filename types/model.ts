interface MoviesModelT {
  id: number;
  title: string;
  slug: string;
  img: string;
  desc: string;
  emdbed: string;
  created_at: string;
}

interface RequestFilmModelT {
  id: number;
  email: string;
  username: string;
  filmName: string;
  reason: string;
  created_at: string;
}

interface BugsModelT {
  id: number;
  email: string;
  img: string;
  why: string;
  created_at: string;
}

export type { MoviesModelT, RequestFilmModelT, BugsModelT };
