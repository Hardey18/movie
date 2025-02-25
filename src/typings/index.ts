export interface MovieListProps {
  categories: string;
  // browse: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any;
  // products: ProductProps[] | null;
  four?: boolean;
  link: string;
  type?: string;
  onTypeChange?: unknown;
  recommend?: boolean;
}

export interface EpisodeListProps {
  series: SeriesProps[];
}

export interface SeriesProps {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface CardProps {
  title: string;
  budget: number;
}

export interface IMovieDataProps {
  id: string;
  name: string;
  title: string;
  seasons: SeriesProps[];
  original_name: string;
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
  status: string;
  homepage: string;
  number_of_seasons: number;
  number_of_episodes: number;
  release_date: string;
  first_air_date: string;
  genres: GenresProps[];
  production_companies: ProductionCompanies[];
  spoken_languages: SpokenLanguagesProps[];
  production_countries: ProductionCountriesProps[];
  belongs_to_collection: BelongsToCollectionProps;
  created_by: SeriesCreatedByProps[];
}

interface SeriesCreatedByProps {
  name: string;
  profile_path: string;
}

export interface IVideoDataProps {
  results: VideoResultsProps[];
}

interface VideoResultsProps {
  name: string;
  key: string;
  type: string;
}

export interface ICreditDataProps {
  cast: CastProps[];
}

export interface ICPercentProps {
  percent: number;
}
export interface IExternalIdDataProps {
  id: number;
  imdb_id: string;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}

export interface TargetProps {
  target: InnerTargetProps;
}

interface InnerTargetProps {
  value: string;
}

export interface CastProps {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
  poster_path: string;
  title: string;
  release_date: string;
  first_air_date: string
}

export interface ProductProps {
  length: number;
  map(
    arg0: (product: IMovieDataProps) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  id: number;
  title: string;
  name: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  first_air_date: string;
  vote_average: number;
  total_results?: number;
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
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface MovieCategoryProps {
  total_results: string;
}

export interface TvCategoryProps {
  total_results: string;
}
