export const bindings = {
  ui: {
    toggleMenu: 'M'
  },
  game: {
    moveUp: 'W',
    moveDown: 'S',
    moveLeft: 'A',
    moveRight: 'D'
  }
};

export function setupKeyboard() {
  let keyboard = { keys: {} };

  window.addEventListener("keydown", event => {
    for(let key in bindings.game) {
      if(bindings.game[key] === event.key) {
        keyboard.keys[event.key] = true;
      }
    }
  }, false);

  window.addEventListener("keyup", event => {
    for(let key in bindings.game) {
      if(bindings.game[key] === event.key) {
        keyboard.keys[event.key] = false;
      }
    }
  }, false);
  return keyboard;
}
