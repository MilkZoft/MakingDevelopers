export default function deviceReducer(state = {}) {
  if (state.isMobile) {
    state.isMobile = state.isMobile === 'false' ? false : true;
  }

  return state;
}
