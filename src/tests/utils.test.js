export const getRandomFloat = (min, max) => {
    return Number((Math.random() * (max - min + 1) + min).toFixed(2));
}

export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
