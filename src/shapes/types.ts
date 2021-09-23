export interface Shape {
  draw(ctx: CanvasRenderingContext2D, osCtx: OffscreenCanvasRenderingContext2D): void;

  on(name: string, listener: Listener): void;

  getListeners(): { [name: string]: Listener[] };

  getId(): string;

  getMyCtx(width: number, height: number): OffscreenCanvasRenderingContext2D;
}

export interface Listener {
  (evt: MouseEvent): void;
}

export enum EventNames {
  click = 'click',
  mousedown = 'mousedown',
  mousemove = 'mousemove',
  mouseup = 'mouseup',
  mouseenter = 'mouseenter',
  mouseleave = 'mouseleave',
}
