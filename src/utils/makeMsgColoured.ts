export const makeMsgColoured = (color: number, msg: string) => {
    console.log(`\x1b[${color}m ${msg} \x1b[0m`)
}