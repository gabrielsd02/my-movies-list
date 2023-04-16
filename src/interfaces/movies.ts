export interface Movies {
    page: number;
    results: {
      adult: boolean;
      backdrop_path: string;
      genre_ids?: number[];
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }[]
    total_pages: number;
    total_results: number;
}

export interface MovieCastProps {
  adult: boolean;
  gender: number | null;
  id: number;
  character: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface MovieInfoProps extends Omit<Movies['results'][0], "genre_ids"> {
  genres: {
      id: number;
      name: string;
  }[];
  production_companies: {
      id: number;
      logo_path?: string;
      name: string;
      origin_country: string;
  }[];
  runtime: number;
  status: string;
}

export interface GenresMovies {
  id: number;
  name: string;
}