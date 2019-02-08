export const createApiActionTypes = base => ({
  DEFAULT: base,
  REQUEST: `${base}_REQUEST`,
  SUCCESS: `${base}_SUCCESS`,
  FAILURE: `${base}_FAILURE`,
});
