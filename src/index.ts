import { rgbaToId } from './helpers';
import { Shape } from './shapes/types';
import EventSimulator, { ActionType } from './EventSimulator';
export * from './shapes';

export class Stage {
  private canvas: HTMLCanvasElement;
  private osCanvas: OffscreenCanvas;
  private ctx: CanvasRenderingContext2D;
  private osCtx: OffscreenCanvasRenderingContext2D;
  private dpr: number;
  private shapes: Set<string>;
  private eventSimulator: EventSimulator;
  private ctxList: [OffscreenCanvasRenderingContext2D];
  private initWidth: number;
  private initHeight: number;

  constructor(canvas: HTMLCanvasElement) {
    this.initWidth = canvas.width 
    this.initHeight = canvas.height
    this.canvas = canvas;
    this.osCanvas = new OffscreenCanvas(canvas.width, canvas.height);
    const dpr = window.devicePixelRatio;
    
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.osCtx = this.osCanvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
    this.ctx.scale(dpr, dpr);
    this.osCtx.scale(dpr, dpr);
    this.dpr = dpr;

    this.canvas.addEventListener('mousedown', this.handleCreator(ActionType.Down));
    this.canvas.addEventListener('mouseup', this.handleCreator(ActionType.Up));
    this.canvas.addEventListener('mousemove', this.handleCreator(ActionType.Move));
    this.canvas.addEventListener('click', this.handleCreator(ActionType.Click));

    this.shapes = new Set();
    this.ctxList = [this.osCtx];
    this.eventSimulator = new EventSimulator();
  }

  add(shape: Shape): void {
    const id = shape.getId();
    this.eventSimulator.addListeners(id, shape.getListeners());
    this.shapes.add(id);
    shape.draw(this.ctx, this.osCtx);
  }

  private handleCreator = (type: ActionType) => (evt: MouseEvent) => {
    const x = evt.offsetX;
    const y = evt.offsetY;
    const id = this.hitJudge(x, y);
    this.eventSimulator.emit({ type, id }, evt);
  };

  /**
   * 判断当前鼠标位置是否存在图形，如果存在返回其id
   * @param x
   * @param y
   */
  private hitJudge(x: number, y: number) {
    const rgba = Array.from(this.osCtx.getImageData(x * this.dpr, y * this.dpr, 1, 1).data);

    const id = rgbaToId(rgba as [number, number, number, number]);
    return this.shapes.has(id) ? id : '';
  }
}