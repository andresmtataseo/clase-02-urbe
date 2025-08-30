export interface MovieVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface MovieVideosResponse {
  id: number;
  results: MovieVideo[];
}

export interface MovieTrailerData {
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}