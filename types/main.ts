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

export type { LinkNavbar, LoginT, AddMovieT };
