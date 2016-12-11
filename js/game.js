import React                   from 'react';
import * as Pixi               from 'pixi.js';
import Stats                   from 'stats.js';
import path                    from 'path';
import { render as renderUI }  from 'react-dom';
import { entityHasComponents } from './utils';
import Root                    from './ui/root';
import Keyboard                from './keyboard';
import * as Entities           from './entities';
import * as Sprites            from './sprites';
import Rooms                   from '../rooms/first.json';
import { 
  Input, Physics, Collision, Movement
} from './systems';

export default class Game {
  constructor() {
    this.entities = [];
    this.stats = this.setupStats();
    this.keyboard = new Keyboard();
    this.stage = new Pixi.Container();
    this.renderer = this.setupRenderer();

    this.room = null;
    this.player = null;

    this.setupGame = this.setupGame.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);

    renderUI(<Root />, document.getElementById('ui'));
  }

  loadGame() {
    console.log('loading game');
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
    console.log('loaded game');
    //this.createEntity('room');
    this.createEntity('player');
    this.startGame();
  }

  startGame() {
    requestAnimationFrame(this.render);
    this.update();
    console.log('game started');
  }

  createEntity(entityKey) {
    let entities = Entities[entityKey]();
    entities.forEach(entity => {
      if(entityHasComponents(entity, ['sprite'])) {
        this.stage.addChild(entity.sprite);
      }
      this.entities.push(entity);
    });
  }

  update() {
    setTimeout(this.update, 16);
    this.stats.game.begin();
    this.entities = Input.update(this.entities, this.keyboard);
    this.entities = Movement.update(this.entities);
    this.entities = Physics.update(this.entities);
    //Collision.update(this.store.dispatch, Object.values(entities));
    this.stats.game.end();
  }

  render() {
    requestAnimationFrame(this.render);
    for (var i = this.stage.children.length - 1; i >= 0; i--) {  
      this.stage.removeChild(this.stage.children[i]);
    }
    this.entities.forEach(entity => {
      if(entityHasComponents(entity, ['sprite'])) {
        this.stage.addChild(entity.sprite);
      }
    });
    this.renderer.render(this.stage);
  }
}
