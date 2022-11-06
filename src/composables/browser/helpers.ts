import { fromUnixTime, isAfter } from 'date-fns';

/**
 * Determine the mobile operating system.
 * If mobile OS is detected, returns 'iOS', 'Android', or 'Windows Phone'
 * Else returns null
 *
 * @returns {String|null}
 */
export const getMobileOperatingSystem = () => {
  const userAgent = navigator.userAgent || navigator.vendor;

  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'iOS';
  }

  return null;
};

/**
 * Get default fetch options
 * @param jwt
 * @param overrides
 * @returns
 */
export const getOptions = (
  jwt: {
    expires: number;
    token: string;
  },
  overrides = {}
) => {
  return {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${jwt.token}`
    },
    ...overrides
  };
};

/**
 * Determine if token has expired
 * @param token
 * @param today
 * @returns {Boolean}
 */
export const isTokenValid = (
  token: { expires: number; token: string },
  today = new Date()
) => {
  const date = fromUnixTime(token.expires);

  return isAfter(date, today);
};
