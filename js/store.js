import { combineReducers, compose, applyMiddleware, createStore } from 'redux';
import thunkMiddleware      from 'redux-thunk'
import gameMiddleware       from './middleware/game';
import { loggerMiddleware } from './middleware/logger';
import { uiReducer }        from './modules/ui';
import { gameReducer }      from './modules/game';
import { entityReducer }    from './modules/entity';

export function buildStore(game) {
  const rootReducer = combineReducers({
    game: gameReducer,
    entities: entityReducer,
    ui: uiReducer,
  });

  return compose(
    applyMiddleware(thunkMiddleware, gameMiddleware(game), loggerMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)(rootReducer);
}
