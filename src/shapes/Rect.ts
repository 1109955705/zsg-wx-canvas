import { idToRgba } from '../helpers';
import Base from './Base';

interface RectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  radius0: number;
  radius1: number;
  radius2: number;
  radius3: number;
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
    radius0: 0,
    radius1: 0,
    radius2: 0,
    radius3: 0,
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
    this.drawProps.radius0 = this.props.radius0 || 0;
    this.drawProps.radius1 = this.props.radius1 || 0;
    this.drawProps.radius2 = this.props.radius2 || 0;
    this.drawProps.radius3 = this.props.radius3 || 0;
    this.drawProps.fillColor = this.props.fillColor || '#fff';
  }

  draw(ctx: CanvasRenderingContext2D, osCtx: OffscreenCanvasRenderingContext2D) {
    const { x, y, width, height, radius0, radius1, radius2, radius3, fillColor } = this.drawProps;

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = fillColor;
    ctx.moveTo(x , y + radius0)
    ctx.quadraticCurveTo(x , y , x + radius0 , y);
    ctx.lineTo(x + width - radius1, y)
    ctx.quadraticCurveTo(x + width, y, x + width , y + radius1);
    ctx.lineTo(x + width, y + height - radius2)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius2 , y + height);
    ctx.lineTo(x + radius3, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius3);
    ctx.fill();

    const [r, g, b, a] = idToRgba(this.id);

    // all
    osCtx.save();
    osCtx.beginPath();
    osCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    osCtx.rect(x, y, width, height);
    osCtx.fill();
    osCtx.restore();

    // self
    this.myCtx.save();
    this.myCtx.beginPath();
    this.myCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    this.myCtx.rect(x, y, width, height);
    this.myCtx.fill();
    this.myCtx.restore();
  }
}
