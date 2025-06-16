const KEY = 'loves-dogs-key';
const DEFAULT_TTL = 3600000; // 1 hour in milliseconds

interface SessionData {
  expires: number;
}

export const useSessionStorage = () => {
  const setSessionFlag = () => {
    try {
      const valueToStore: SessionData = {
        expires: Date.now() + DEFAULT_TTL,
      };
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(KEY, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error('Error setting session flag:', error);
    }
  };

  const removeSessionFlag = () => {
    try {
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(KEY);
      }
    } catch (error) {
      console.error('Error removing session flag:', error);
    }
  };

  const verifySessionFlag = (): boolean => {
    if (typeof window === 'undefined') return false;

    try {
      const item = window.sessionStorage.getItem(KEY);
      if (!item) return false;

      const parsedItem = JSON.parse(item) as SessionData;
      
      if (!('expires' in parsedItem)) {
        window.sessionStorage.removeItem(KEY);
        return false;
      }

      if (Date.now() < parsedItem.expires) {
        return true;
      } else {
        window.sessionStorage.removeItem(KEY);
        return false;
      }
    } catch (error) {
      console.error('Error verifying session flag:', error);
      window.sessionStorage.removeItem(KEY);
      return false;
    }
  };

  return [setSessionFlag, removeSessionFlag, verifySessionFlag] as const;
};
