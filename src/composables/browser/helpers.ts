import {
  differenceInHours,
  differenceInDays,
  fromUnixTime,
  isAfter
} from 'date-fns';

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
type Options = {
  method: string;
  withCredentials?: boolean;
  credentials?: string;
  [key: string]: any;
  headers: {
    [key: string]: string;
    Authorization: string;
  };
};
export const getOptions = (
  jwt: {
    expires: number;
    token: string;
  },
  overrides = {}
): Options => {
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

export const isExpired = (
  timestamp: number,
  expiration: string,
  startDate = new Date()
) => {
  const [amount, unit] = expiration.split('');
  const number = Number(amount);

  let difference;

  if (unit === 'H') {
    difference = differenceInHours(startDate, new Date(timestamp));
  } else {
    difference = differenceInDays(startDate, new Date(timestamp));
  }

  return difference >= number;
};

export const toKebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
