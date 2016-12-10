import { combineReducers, compose, applyMiddleware, createStore } from 'redux';
import thunkMiddleware    from 'redux-thunk'
import { uiReducer }      from './modules/ui';
import { gameReducer }    from './modules/game';
import { playerReducer }  from './modules/player';
import { entityReducer }  from './modules/entity';

export function buildStore() {
  const rootReducer = combineReducers({
    game: gameReducer,
    player: playerReducer,
    entities: entityReducer,
    ui: uiReducer,
  });

  return compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)(rootReducer);
}
