type UserInfo = {
    name: string;
    email: string;
};

type DogType = {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
};

type SortField = 'breed' | 'name' | 'age';
type SortDirection = 'asc' | 'desc';
type SortQuery = `${SortField}:${SortDirection}`;

type SearchParams = {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: SortQuery;
};

export { DogType, UserInfo, SearchParams, SortQuery, SortField, SortDirection };