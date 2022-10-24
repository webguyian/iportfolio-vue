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
