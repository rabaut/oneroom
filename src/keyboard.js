export function setupKeyboard(keybindings) {
  let keyboard = { keys: {} };
  window.addEventListener("keydown", event => {
    for(let key in keybindings) {
      if(keybindings[key] === event.key) {
        keyboard.keys[event.key] = true;
      }
    }
  }, false);
  window.addEventListener("keyup", event => {
    for(let key in keybindings) {
      if(keybindings[key] === event.key) {
        keyboard.keys[event.key] = false;
      }
    }
  }, false);
  return keyboard;
}
