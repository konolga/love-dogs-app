import { CONSTS } from './consts/endpoints';
export type UserInfo = {
    name: string;
    email: string;
};

export const authService = {
    async login (body: UserInfo): Promise<boolean> {
    try {
      const response = await fetch(`${CONSTS.BASE_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...body }),
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  },
  async logout(userInfo: UserInfo): Promise<boolean> {
    try {
      if (!userInfo) {
        throw new Error('User info is required for logout');
      }
      const response = await fetch(`${CONSTS.BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ ...userInfo }),
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  },
};

