/**
 * Validates if the User Agent is a Desktop Browser
 *
 * @param {string} ua User Agent
 * @returns {boolean} True if is a Desktop Browser
 */
export function isDesktop(ua) {
  return !/mobile/i.test(ua);
}

/**
 * Validates if the User Agent is a Mobile Browser
 *
 * @param {string} ua User Agent
 * @returns {boolean} True if is a Mobile Browser
 */
export function isMobile(ua) {
  return /mobile/i.test(ua);
}

/**
 * Returns current device (desktop or mobile)
 *
 * @param {string} ua User Agent
 * @returns {string} Current device
 */
export function getCurrentDevice(ua) {
  return /mobile/i.test(ua) ? 'mobile' : 'desktop';
}
