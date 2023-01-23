import  { getMousePsn, mouseMoveUp, mouseMoveDown, mouseMoveRight, mouseMoveLeft } from "./mouse"
import { IallCommands } from "../interfaces/allCommandsInterface"


export const allCommands: IallCommands = {
'mouse_position' : getMousePsn,
'mouse_up': mouseMoveUp,
'mouse_down': mouseMoveDown,
'mouse_right': mouseMoveRight,
'mouse_left': mouseMoveLeft,
}