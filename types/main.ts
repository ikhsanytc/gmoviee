interface LinkNavbar {
  display: string;
  link: string;
}

interface LoginT {
  email: string;
  password: string;
}

interface AddMovieT {
  img: string;
  title: string;
  desc: string;
  emdbed: string;
}

interface RequestFilmFormT {
  email: string;
  username: string;
  filmName: string;
  reason: string;
}

interface RequestFilmT {
  id: number;
  email: string;
  username: string;
  filmName: string;
  reason: string;
  created_at: string;
}

export type { LinkNavbar, LoginT, AddMovieT, RequestFilmFormT, RequestFilmT };
