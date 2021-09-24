import { Listener, EventNames } from './shapes';

export interface Action {
  type: ActionType;
  ids: string[];
}

export enum ActionType {
  Down = 'DOWN',
  Up = 'Up',
  Move = 'MOVE',
  Click = 'Click'
}

export default class EventSimulator {
  private listenersMap: {
    [id: string]: {
      [eventName: string]: Listener[];
    };
  } = {};

  private lastDownId = '';
  private lastMoveId = '';

  emit(action: Action, evt: MouseEvent) : void {
    const { type, ids } = action;
    // console.log('=======', type, ids)
    switch (type) {
      case ActionType.Move:
        if (!this.lastMoveId || this.lastMoveId !== ids[0]) {
          this.fire([this.lastMoveId], EventNames.mouseleave, evt);
        } else {
          // mouseover
          this.fire(ids, EventNames.mousemove, evt);
        }
        this.lastMoveId = action.ids[0];
        break
      case ActionType.Down:
        this.fire(ids, EventNames.mousedown, evt);
        this.lastDownId = action.ids[0];
        break
      case ActionType.Up:
        this.fire(ids, EventNames.mouseup, evt);
        break
      case ActionType.Click:
        this.fire(ids, EventNames.mouseenter, evt);
        break
      default:
        console.log('default emit')
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
