import  { getMousePsn, mouseMoveUp, mouseMoveDown, mouseMoveRight, mouseMoveLeft } from "./mouse";
import { IallCommands } from "../interfaces/allCommandsInterface";
import { drawRectangle, drawCircle } from "./draw";
import { makeScreenshot } from "./screenshot";


export const allCommands: IallCommands = {
'mouse_position' : getMousePsn,
'mouse_up': mouseMoveUp,
'mouse_down': mouseMoveDown,
'mouse_right': mouseMoveRight,
'mouse_left': mouseMoveLeft,
'draw_square': drawRectangle,
'draw_rectangle': drawRectangle,
'draw_circle': drawCircle,
'prnt_scrn': makeScreenshot
}