import { idToRgba } from '../helpers';
import Base from './Base';

interface RectProps {
  origin?: number[]
  x: number;
  y: number;
  radius: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
}

export default class Circle extends Base {
  public drawProps: Required<RectProps> = {
    origin: [0, 0],
    x: 0,
    y: 0,
    radius: 0,
    strokeWidth: 0,
    strokeColor: '',
    fillColor: '',
  };

  constructor(private props: RectProps) {
    super();
    this.drawProps.x = this.props.x || 0;
    this.drawProps.y = this.props.y || 0;
    this.drawProps.radius = this.props.radius || 0;
    this.drawProps.fillColor = this.props.fillColor || '#fff';
    this.drawProps.origin = this.props.origin || [0, 0];
  }

  draw(ctx: CanvasRenderingContext2D, osCtx: OffscreenCanvasRenderingContext2D) {
    const { x, y, origin, radius, fillColor } = this.drawProps;

    ctx.save();
    ctx.beginPath();
    ctx.translate(origin[0], origin[1])
    ctx.fillStyle = fillColor;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const [r, g, b, a] = idToRgba(this.id);

    // all
    osCtx.save();
    osCtx.beginPath();
    osCtx.translate(origin[0], origin[1])
    osCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    osCtx.arc(x, y, radius, 0, Math.PI * 2);
    osCtx.fill();
    osCtx.stroke();
    osCtx.restore();
  }
}
