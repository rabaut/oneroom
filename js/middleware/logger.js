export const loggerMiddleware = store => next => action => {
  let result = next(action);

  console.groupCollapsed(action.type);
    console.info('dispatching', action);
    console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result;
}
