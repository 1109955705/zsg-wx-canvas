import { idToRgba } from '../helpers';
import Base from './Base';

interface RectProps {
  x: number;
  y: number;
  radius: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
}

export default class Circle extends Base {
  private drawProps: Required<RectProps> = {
    x: 0,
    y: 0,
    radius: 0,
    strokeWidth: 0,
    strokeColor: '',
    fillColor: '',
  };

  constructor(private props: RectProps) {
    super();
    this.drawProps.x = this.props.x && this.props.x;
    this.drawProps.y = this.props.x && this.props.y;
    this.drawProps.radius = this.props.radius || 0;
    this.drawProps.fillColor = this.props.fillColor || '#fff';
  }

  draw(ctx: CanvasRenderingContext2D, osCtx: OffscreenCanvasRenderingContext2D) {
    const { x, y, radius, fillColor } = this.drawProps;

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = fillColor;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const [r, g, b, a] = idToRgba(this.id);

    // all
    osCtx.save();
    osCtx.beginPath();
    osCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    osCtx.arc(x, y, radius, 0, Math.PI * 2);
    osCtx.fill();
    osCtx.stroke();
    osCtx.restore();

    // self
    this.myCtx.save();
    this.myCtx.beginPath();
    this.myCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    this.myCtx.arc(x, y, radius, 0, Math.PI * 2);
    this.myCtx.fill();
    this.myCtx.stroke();
    this.myCtx.restore();
  }
}
