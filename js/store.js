import { combineReducers, compose, applyMiddleware, createStore } from 'redux';
import thunkMiddleware    from 'redux-thunk'
import gameMiddleware     from './middleware/game';
import { uiReducer }      from './modules/ui';
import { gameReducer }    from './modules/game';
import { playerReducer }  from './modules/player';
import { entityReducer }  from './modules/entity';

export function buildStore(game) {
  const rootReducer = combineReducers({
    game: gameReducer,
    player: playerReducer,
    entities: entityReducer,
    ui: uiReducer,
  });

  return compose(
    applyMiddleware(thunkMiddleware, gameMiddleware(game)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)(rootReducer);
}
