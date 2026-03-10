export const getRandomFloat = (min: number, max: number) => {
    return Number((Math.random() * (max - min + 1) + min).toFixed(2));
}

export const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
