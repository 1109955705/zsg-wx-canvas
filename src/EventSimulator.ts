import { Listener, EventNames } from './shapes';

export interface Action {
  type: ActionType;
  ids: string[];
}

export enum ActionType {
  Down = 'DOWN',
  Up = 'Up',
  Move = 'MOVE',
}

export default class EventSimulator {
  private listenersMap: {
    [id: string]: {
      [eventName: string]: Listener[];
    };
  } = {};

  private lastDownId = '';
  private lastMoveId = '';

  addAction(action: Action, evt: MouseEvent) : void {
    const { type, ids } = action;
    // mousemove
    if (type === ActionType.Move) {
      this.fire(ids, EventNames.mousemove, evt);
    }

    // mouseover
    // mouseenter
    if (type === ActionType.Move && (!this.lastMoveId || this.lastMoveId !== ids[0])) {
      this.fire(ids, EventNames.mouseenter, evt);
      this.fire([this.lastMoveId], EventNames.mouseleave, evt);
    }

    // mousedown
    if (type === ActionType.Down) {
      this.fire(ids, EventNames.mousedown, evt);
    }

    // mouseup
    if (type === ActionType.Up) {
      this.fire(ids, EventNames.mouseup, evt);
    }

    // click
    if (type === ActionType.Up && this.lastDownId === ids[0]) {
      this.fire(ids, EventNames.click, evt);
    }

    if (type === ActionType.Move) {
      this.lastMoveId = action.ids[0];
    } else if (type === ActionType.Down) {
      this.lastDownId = action.ids[0];
    }
  }

  addListeners(
    id: string,
    listeners: {
      [eventName: string]: Listener[];
    },
  ) : void {
    this.listenersMap[id] = listeners;
  }

  fire(ids: string[], eventName: EventNames, evt: MouseEvent) : void {
    ids.forEach(id => {
      if (this.listenersMap[id] && this.listenersMap[id][eventName]) {
        this.listenersMap[id][eventName].forEach((listener) => listener(evt));
      }
    })
    // const id = ids[0]
    // if (this.listenersMap[id] && this.listenersMap[id][eventName]) {
    //   this.listenersMap[id][eventName].forEach((listener) => listener(evt));
    // }
  }
}
