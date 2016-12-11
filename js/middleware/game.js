export default function gameMiddleware(game) {
  return store => next => action => {
    switch(action.type) {
      case 'START':
        game.loadGame();
        return next(action);
      default: 
        return next(action);
    }
  }
}