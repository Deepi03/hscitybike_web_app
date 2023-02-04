import { Journey } from "./journey";

export interface JourneyContent {
  content: Journey[];
  totalPages: number;
  totalElements: number;
  pageSize: number;
  lastPage: boolean;
  pageNumber: number;
}
