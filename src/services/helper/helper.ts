import { SearchParams } from "@/types/types";

export function buildSearchParams(searchParams: SearchParams): URLSearchParams {
  const params = new URLSearchParams();
  if (searchParams.breeds) searchParams.breeds.forEach(breed => params.append('breeds', breed));
  if (searchParams.zipCodes) searchParams.zipCodes.forEach(zip => params.append('zipCodes', zip));
  if (searchParams.ageMin !== undefined) params.append('ageMin', searchParams.ageMin.toString());
  if (searchParams.ageMax !== undefined) params.append('ageMax', searchParams.ageMax.toString());
  if (searchParams.size !== undefined) params.set('size', searchParams.size.toString());
  if (searchParams.from) params.set('from', searchParams.from.toString());
  if (searchParams.sort) params.set('sort', searchParams.sort);
  return params;
}