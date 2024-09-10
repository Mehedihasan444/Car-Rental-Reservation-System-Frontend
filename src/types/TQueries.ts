export interface TQueries {
  searchTerm?: string[];
  limit?: number;
  page?: number;
  sort?: string;
  filter?: string;
  type?: string;
  brand?: string;
  features?: string;
  status?: string;
  fuelType?: string;
  transmission?: string;
  seatingCapacity?: number;
  noOfDoors?:number;
  engineType?: string;
  minPrice?: number;
  maxPrice?: number;
}
