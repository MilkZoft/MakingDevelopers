export const ON_APP_COMPONENT_DID_MOUNT = 'ON_APP_COMPONENT_DID_MOUNT';
export const UPDATE_APP_STATE_FROM_STORAGE = 'UPDATE_APP_STATE_FROM_STORAGE';

export function updateAppStateFromStorage() {
  return ({ dispatch }) => {
    return {
      type: UPDATE_APP_STATE_FROM_STORAGE
    };
  };
}

export function onAppComponentDidMount() {
  return {
    type: ON_APP_COMPONENT_DID_MOUNT
  };
}
