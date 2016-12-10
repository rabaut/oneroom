import { combineReducers, compose, applyMiddleware, createStore } from 'redux';
import thunkMiddleware    from 'redux-thunk'
import { syncMiddleware } from './middleware/sync';
import { uiReducer }      from './modules/ui';
import { apiReducer }     from './modules/api';
import { gameReducer }    from './modules/game';
import { playerReducer }  from './modules/player';
import { entityReducer }  from './modules/entity';
import { chatReducer }    from 'shared/modules/chat';

export function buildStore(socket) {
  const rootReducer = combineReducers({
    api: apiReducer,
    game: gameReducer,
    player: playerReducer,
    entities: entityReducer,
    ui: uiReducer,
    chat: chatReducer
  });

  return compose(
    applyMiddleware(/*syncMiddleware(socket),*/ thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)(rootReducer);
}
