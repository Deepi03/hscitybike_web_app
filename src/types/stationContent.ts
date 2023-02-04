import { Station } from "./station";

export interface StationContent {
  content: Station[];
  totalPages: number;
  totalElements: number;
  pageSize: number;
  lastPage: boolean;
  pageNumber: number;
}
