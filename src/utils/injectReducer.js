export const injectReducer = (initialState, handlers) => (
  state = initialState,
  action = {}
) => {
  if (action.hasOwnProperty('type') && handlers[action.type]) {
    return handlers[action.type](state, action);
  }

  return state;
};
