import { createAction } from './createAction';

export const createApiActions = type => {
  const action = createAction(type.DEFAULT);

  action.request = createAction(type.REQUEST);
  action.success = createAction(type.SUCCESS);
  action.failure = createAction(type.FAILURE);

  return action;
};
