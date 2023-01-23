import { mouse, Point } from "@nut-tree/nut-js";

export const drawRectangle = async ([width, length = width]: number[]) => {

    let { x, y } = await mouse.getPosition();

    mouse.config.autoDelayMs = 1;
    mouse.config.mouseSpeed = 3;
    mouse.drag([new Point(x + +length, y)]);
    mouse.drag([new Point(x + +length, y + +width)]);
    mouse.drag([new Point(x, y + +width)]);
    mouse.drag([new Point(x, y)]);
    mouse.leftClick();

    if (width === length) return `draw_square`;
    else return `draw_rectangle`;
}

export const drawCircle = async ([radius]: number[]) => {

    mouse.config.autoDelayMs = 100;
    mouse.config.mouseSpeed = 1000;
    
    const calculateY = (x: number, x0: number, y0: number, r: number, direction: number): number => {
        const c = -(r ** 2 - x ** 2 + 2 * x * x0 - x0 ** 2 - y0 ** 2);
        const d = Math.sqrt(y0 ** 2 - c);
        return y0 + d * direction;
    };

    let { x, y } = await mouse.getPosition();

    const x0 = x + +radius;
    const y0 = y;

    for (let i = x; i <= x0 + +radius; i += 0.2) {
        x = i;
        y = calculateY(x, x0, y0, +radius, -1);
        mouse.drag([new Point(x, y)]);
    }

    for (let i = x; i >= x0 - +radius; i -= 0.2) {
        x = i;
        y = calculateY(x, x0, y0, +radius, 1);
        mouse.drag([new Point(x, y)]);
    }

    mouse.leftClick();

    return `draw_cirle`;
}