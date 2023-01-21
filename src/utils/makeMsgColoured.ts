export const makeMsgGreen = (msg: string) => {
    console.log(`\x1b[32m ${msg} \x1b[0m`)
}

export const makeMsgYellow = (msg: string) => {
    console.log(`\x1b[33m ${msg} \x1b[0m`)
}

export const makeMsgBlue = (msg: string) => {
    console.log(`\x1b[34m ${msg} \x1b[0m`)
}