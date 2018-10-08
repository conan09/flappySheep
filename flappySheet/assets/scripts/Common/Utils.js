;window.Utils = window.Utils || {};


/**
 * 得到一个两数之间的随机数
 * @param {Number} min 
 * @param {Number} max 
 */
Utils.getRandomArbitrary = function(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * 得到一个两数之间的随机整数
 * @param {Number} min 
 * @param {Number} max 
 */
Utils.getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 得到一个两数之间的随机整数，包括两个数在内
 * @param {Number} min 
 * @param {Number} max 
 */
Utils.getRandomIntInclusive = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}