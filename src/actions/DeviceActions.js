// Constants
export const SET_PLATFORM = 'SET_PLATFORM';

// Actions
export function setPlatform(platform) {
  return {
    type: SET_PLATFORM,
    payload: { platform }
  };
}
