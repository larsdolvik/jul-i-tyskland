const makeRandom = (min, max)=>min+Math.random()*max

const random = (a = 1, b = 0) => {
    const lower = Math.min(a, b);
    const upper = Math.max(a, b);
    return lower + Math.random() * (upper - lower);
};

const randomInt = (a = 1, b = 0) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
    return Math.floor(lower + Math.random() * (upper - lower + 1))
};



export {makeRandom, random, randomInt}