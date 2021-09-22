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
    this.drawProps.x = this.props.x || 0;
    this.drawProps.y = this.props.y || 0;
    this.drawProps.radius = this.props.radius || 0;
    this.drawProps.fillColor = this.props.fillColor || '#fff';
    this.drawProps.strokeColor = this.props.strokeColor || '#000';
    this.drawProps.strokeWidth = this.props.strokeWidth || 1;
  }

  draw(ctx: CanvasRenderingContext2D, osCtx: OffscreenCanvasRenderingContext2D) {
    const { x, y, radius, strokeColor, strokeWidth, fillColor } = this.drawProps;

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    const [r, g, b, a] = idToRgba(this.id);

    osCtx.save();
    osCtx.beginPath();
    osCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    osCtx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    osCtx.lineWidth = strokeWidth;
    osCtx.arc(x, y, radius, 0, Math.PI * 2);
    osCtx.fill();
    osCtx.stroke();
    osCtx.restore();
  }
}
