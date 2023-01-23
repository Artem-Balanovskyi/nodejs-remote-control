import { mouse, Point } from "@nut-tree/nut-js";

export const getMousePsn = async () => {
    const { x, y } = await mouse.getPosition();
    return `mouse_position ${x},${y}`;
}

export const mouseMove = async (dx: number, dy: number) => {
    const { x, y } = await mouse.getPosition();
    const newMousePsn = new Point(x + dx, y + dy);
    mouse.setPosition(newMousePsn);
}

export const mouseMoveUp = async (dy: number) => {
	await mouseMove(0, -dy);
	return `mouse_up`
}

export const mouseMoveDown = async (dy: number) => {
	await mouseMove(0, +dy);
	return `mouse_down`
}

export const mouseMoveRight = async (dx: number) => {
    await mouseMove(+dx, 0);
    return `mouse_right`
}

export const mouseMoveLeft = async (dx: number) => {
	await mouseMove(-dx, 0);
	return `mouse_left`
}

