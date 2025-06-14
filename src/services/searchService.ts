import { SearchParams } from '@/types/types';
import { CONSTS } from './consts/endpoints';
import { buildSearchParams } from './helper/helper';
import { DogInterface, SearchObjectResponse } from "./interfaces/interfaces";

export const searchService = {
  async getBreeds(): Promise<string[]> {
    try {
      const response = await fetch(`${CONSTS.BASE_URL}/dogs/breeds`, {
        method: "GET",
        credentials: "include",
      });
      return response.json();
    } catch (error) {
      return [];
    }
  },

  async getDogsIds(
    params: SearchParams
  ): Promise<SearchObjectResponse> {
    try {
      const response = await fetch(
        `${CONSTS.BASE_URL}/dogs/search?${buildSearchParams(
          params
        ).toString()}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      return response.json();
    } catch (error) {
      return {
        next: "",
        resultIds: [],
        total: 0,
      };
    }
  },

  async getDogsByIds(
    ids: string[]
  ): Promise<DogInterface[]> {
    try {
      const response = await fetch(
        `${CONSTS.BASE_URL}/dogs`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(ids),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.json();
    } catch (error) {
      return [];
    }
  },

};
