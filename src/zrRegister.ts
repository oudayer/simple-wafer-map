import * as zrender from 'zrender';
import  CanvasPainter  from "zrender/lib/canvas/Painter";

zrender.registerPainter('canvas', CanvasPainter);

export default zrender
