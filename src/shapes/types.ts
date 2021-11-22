export interface Shape {
  origin?: number[];

  draw(ctx: CanvasRenderingContext2D, osCtx: OffscreenCanvasRenderingContext2D): void;

  on(name: string, listener: Listener): void;

  getListeners(): { [name: string]: Listener[] };

  getId(): string;
}

export interface Listener {
  (evt: MouseEvent): void;
}

export enum EventNames {
  mouseclick = 'mouseclick',
  mousedown = 'mousedown',
  mousemove = 'mousemove',
  mouseup = 'mouseup',
  mouseenter = 'mouseenter',
  mouseleave = 'mouseleave',
}
