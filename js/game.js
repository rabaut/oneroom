import React                   from 'react';
import * as Pixi               from 'pixi.js';
import Stats                   from 'stats.js';
import path                    from 'path';
import { render as renderUI }  from 'react-dom';
import { Provider }            from 'react-redux';
import { buildStore }          from './store';
import { entityHasComponents } from './utils';
import Root                    from './ui/root';
import Keyboard                from './keyboard';
import * as Entities           from './entities';
import * as Sprites            from './sprites';
import { start, started }      from './modules/game';
import { toggleVisibility }    from './modules/ui';
import { addEntity }           from './modules/entity';
import Rooms                   from '../rooms/first.json';
import { 
  Input, Physics, Collision, Movement
} from './systems';

export default class Game {
  constructor() {
    this.store = buildStore(this);
    this.stats = this.setupStats();
    this.keyboard = new Keyboard();
    this.stage = new Pixi.Container();
    this.renderer = this.setupRenderer();

    this.room = null;
    this.player = null;

    this.setupGame = this.setupGame.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);

    this.startUI();
  }

  loadGame() {
    PIXI.loader
      .add('creatures', '../assets/textures/sheets/creatures.json')
      .add('world', '../assets/textures/sheets/world.json')
      .add('items', '../assets/textures/sheets/items.json')
      .load(this.setupGame);
  }

  setupStats() {
    let stats = {};
    stats.game = new Stats();
    stats.render = new Stats();
    stats.game.dom.style.cssText = 'z-index:10000;margin-left:46px';
    stats.render.dom.style.cssText = 'z-index:10000;margin-left:46px';
    stats.game.showPanel(0);
    stats.render.showPanel(0);
    return stats;
  }

  setupRenderer() {
    PIXI.settings.SCALE_MODE = Pixi.SCALE_MODES.NEAREST;
    const renderer = new Pixi.WebGLRenderer(800, 800);
    document.getElementById('game').appendChild(renderer.view);
    return renderer;
  }

  setupGame() {
    const state = this.store.getState();
    //this.room = this.createEntity('room');
    this.player = this.createEntity('player');
    this.store.dispatch(started());
    this.startGame();
  }

  startUI() {
    renderUI(
      <Provider store={this.store}>
        <Root />
      </Provider>,
      document.getElementById('ui')
    );
  }

  startGame() {
    requestAnimationFrame(this.render);
    this.update();
    console.log('starting');
    this.store.dispatch(started());
  }

  createEntity(entityKey) {
    let entity = Entities[entityKey](this.store.dispatch, this.stage);
    return entity;
  }

  update() {
    setTimeout(this.update, 16);
    const state = this.store.getState();
    const { entities } = state;
    this.stats.game.begin();
    Input.update(this.store.dispatch, Object.values(entities), this.keyboard);
    Movement.update(this.store.dispatch, Object.values(entities));
    Physics.update(this.store.dispatch, Object.values(entities));
    //Collision.update(this.store.dispatch, Object.values(entities));
    this.stats.game.end();
  }

  render() {
    requestAnimationFrame(this.render);
    const state = this.store.getState();
    const { entities } = state;
    for (var i = this.stage.children.length - 1; i >= 0; i--) {  
      this.stage.removeChild(this.stage.children[i]);
    }
    
    Object.keys(entities).forEach(id => {
      const entity = entities[id];
      if(entityHasComponents(entity, ['sprite'])) {
        this.stage.addChild(entity.sprite);
      }
    });
    this.renderer.render(this.stage);
  }
}
