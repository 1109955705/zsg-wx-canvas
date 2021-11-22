import { Listener, EventNames } from './shapes';

export interface Action {
  type: ActionType;
  id: string;
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
    const { type, id } = action;
    // console.log('=======', type, ids)
    switch (type) {
      case ActionType.Move:
        if (!this.lastMoveId || this.lastMoveId !== id) {
          this.fire(id, EventNames.mouseenter, evt);
          this.fire(this.lastMoveId, EventNames.mouseleave, evt);
        } else {
          // mouseover
          this.fire(id, EventNames.mousemove, evt);
        }
        this.lastMoveId = action.id;
        break
      case ActionType.Down:
        this.fire(id, EventNames.mousedown, evt);
        this.lastDownId = action.id;
        break
      case ActionType.Up:
        this.fire(id, EventNames.mouseup, evt);
        break
      case ActionType.Click:
        this.fire(id, EventNames.mouseclick, evt);
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

  fire(id: string, eventName: EventNames, evt: MouseEvent) : void {
    if (this.listenersMap[id] && this.listenersMap[id][eventName]) {
      this.listenersMap[id][eventName].forEach((listener) => listener(evt));
    }
  }
}
