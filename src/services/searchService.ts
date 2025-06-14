import { CONSTS } from './consts/endpoints';

export const searchService = {
    async getBreeds (): Promise<string[]> {
        try {
            const response = await fetch(`${CONSTS.BASE_URL}/dogs/breeds`, {
                method: 'GET',
                credentials: 'include',
            });
            return response.json();
        } catch (error) {
            return [];
        }
    }
      
};
