export const createAction = type =>
  function(payload, ...rest) {
    return {
      type,
      payload,
      ...rest,
    };
  };
