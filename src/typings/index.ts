export interface MovieListProps {
  categories: string;
  browse: string;
  products: ProductProps[] | null;
  four?: boolean;
  link: string;
}

export interface CardProps {
  title: string;
  budget: number;
}

export interface IMovieDataProps {
  title: string;
  backdrop_path: string;
  original_title: string;
  tagline: string;
  budget: number;
  revenue: number;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  overview: string;
  runtime: number;
  release_date: string;
  genres: GenresProps[];
  production_companies: ProductionCompanies[];
  spoken_languages: SpokenLanguagesProps[];
  production_countries: ProductionCountriesProps[];
  belongs_to_collection: BelongsToCollectionProps;
}

export interface IVideoDataProps {
  results: VideoResultsProps[];
}

interface VideoResultsProps {
  name: string;
  key: string;
}

export interface ICreditDataProps {
  cast: CastProps[]
}

export interface CastProps {
  adult: boolean
  cast_id: number
  character: string
  credit_id: string
  gender: number
  id: number
  known_for_department: string
  name: string
  order: number
  original_name: string
  popularity: number
  profile_path: string
}

interface ProductProps {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface BelongsToCollectionProps {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
}

interface GenresProps {
  id: number;
  name: string;
}

interface SpokenLanguagesProps {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface ProductionCountriesProps {
  iso_3166_1: string;
  name: string;
}

interface ProductionCompanies {
    id: number
    logo_path: string;
    name: string;
    origin_country: string
}