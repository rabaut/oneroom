'use strict'

import './index.css';

import React                       from 'react';
import PIXI                        from 'pixi.js';
import Stats                       from 'stats.js';
import path                        from 'path';
import { render as renderUI }      from 'react-dom';
import { Provider }                from 'react-redux';
import { buildStore }              from './store';
import Root                        from './ui/root';
import { setupKeyboard }           from './keyboard';
import * as Entities               from './entities';
import * as Sprites                from './sprites';
import { started }                 from './modules/game';
import { toggleVisibility }        from './modules/ui';
import Input                       from './systems/input';
import Physics                     from './systems/physics';
import { setBlockAtWorldPosition } from './world';
import { entityHasComponents }     from './utils';
import { addEntity }               from './modules/entity';
import Collision                   from './systems/collision';
import Movement                    from './systems/movement'

var socket, store, keyboard, mouse, stats, systems, stage, world, renderer, player;

let lastLog = Math.floor(Date.now() / 1000);
const messageSubmitNode = document.getElementById('message-submit');

setupCore();
setupUI();

function setupCore() {
  socket = setupSocket();
  store = setupStore();
}

function setupStore() {
  let store = buildStore(socket);
  store.subscribe(handleStoreChange.bind(this));
  return store;
}

function handleStoreChange() {
  const state = store.getState();
  const { starting, started } = state.game;
  if(starting) { setupGame(); }
}

function setupUI() {
  stats = setupStats();
  renderUI(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById('ui')
  );
}

function setupStats() {
  let stats = {};
  stats.game = new Stats();
  stats.render = new Stats();
  stats.game.dom.style.cssText = 'z-index:10000;margin-left:46px';
  stats.render.dom.style.cssText = 'z-index:10000;margin-left:46px';
  stats.game.showPanel(0);
  stats.render.showPanel(0);
  return stats;
}

function setupGame() {
  const state = store.getState();
  const { keybindings } = state.api.user.settings;
  systems  = setupSystems(),
  keyboard = setupKeyboard(keybindings.game),
  mouse    = {}, // replace
  stage    = new PIXI.Container(),
  renderer = setupRenderer(),
  world    = setupWorld(),
  player    = setupLocalPlayer({name: "God"});
  store.dispatch(started());
  start();
}

function setupWorld() {
  let world = generateWorld();
  //world.sprite = Sprites.world(world);
  //stage.addChild(world.sprite);
}

function setupRenderer() {
  PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
  const renderer = new PIXI.WebGLRenderer(800, 600);
  document.body.appendChild(renderer.view);
  return renderer;
}

function setupSystems() {
  return {
    input: { components: ['inputs'], entities: [] },
    movement: { components: ['inputs', 'linearVelocity', 'angularVelocity'], entities: [] },
    physics: { components: ['linearVelocity', 'angularVelocity', 'rotation', 'position', 'sprite', 'collision'], entities: [] },
    collision: { components: ['position', 'collision', 'sprite'], entities: [] },
    jump: { components: ['jump', 'inputs', 'collision'], entities: [] },
    sprite: { components: ['linearVelocity', 'angularVelocity', 'sprite'], entities: [] }
  };
}

function setupLocalPlayer(user) {
  let player = Entities.localPlayer(user);
  setupEntity(player);
  return player;
};

function setupEntity(entity) {
  store.dispatch(addEntity(entity, 'CLIENT'));
  for(let sys in systems) {
    let system = systems[sys];
    if(entityHasComponents(entity, system.components)) {
      system.entities.push(entity.id);
      /*if(system === systems.sprite) {
        stage.addChild(entity.sprite);
        stage.children.sort((a,b) => (b.zIndex - a.zIndex));
      }*/
    }
  }
}

function start() {
  let home = document.getElementById('home');
  requestAnimationFrame(render);
  //update();
  console.log('starting');
  store.dispatch(started());
};

function update() {
  setTimeout(update, 16);
  const state = store.getState();
  const { player, entities, ui } = state;
  stats.game.begin();
  Input.update(store.dispatch, player, keyboard);
  //World.update(store.dispatch, world);
  Movement.update(store.dispatch, entities, systems.movement.entities);
  Physics.update(store.dispatch, entities, systems.physics.entities);
  //Collision.update(store.dispatch, entities, systems.collision.entities, world.blocks);
  stats.game.end();

  log();
};

function render() {
  requestAnimationFrame(render);
  renderer.render(stage);
}

function parseMap(data) {
  //console.log(JSON.parse(data));
}

function log() {
  let now = Math.floor(Date.now() / 1000);
  if(now > lastLog + 5) {
    //console.log(something);
    lastLog = now;
  }
}
