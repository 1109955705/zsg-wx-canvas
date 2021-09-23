import { idToRgba } from '../helpers';
import Base from './Base';

interface RectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
}

export default class Rect extends Base {
  private drawProps: Required<RectProps> = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    strokeWidth: 0,
    strokeColor: '',
    fillColor: '',
  };
  constructor(private props: RectProps) {
    super();
    this.drawProps.x = this.props.x || 0;
    this.drawProps.y = this.props.y || 0;
    this.drawProps.width = this.props.width || 0;
    this.drawProps.height = this.props.height || 0;
    this.drawProps.fillColor = this.props.fillColor || '#fff';
    this.drawProps.strokeColor = this.props.strokeColor || '#000';
    this.drawProps.strokeWidth = this.props.strokeWidth || 1;
  }

  draw(ctx: CanvasRenderingContext2D, osCtx: OffscreenCanvasRenderingContext2D) {
    const { x, y, width, height, strokeColor, strokeWidth, fillColor } = this.drawProps;

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.fillStyle = fillColor;
    ctx.rect(x, y, width, height);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    const [r, g, b, a] = idToRgba(this.id);

    // all
    osCtx.save();
    osCtx.beginPath();
    osCtx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    osCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    osCtx.rect(x, y, width, height);
    osCtx.fill();
    osCtx.stroke();
    osCtx.restore();

    // self
    this.myCtx.save();
    this.myCtx.beginPath();
    this.myCtx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    this.myCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    this.myCtx.rect(x, y, width, height);
    this.myCtx.fill();
    this.myCtx.stroke();
    this.myCtx.restore();
  }
}
