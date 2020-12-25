export const utilService = {
    makeId,
    getRandomInt,
    getInitials
};

function makeId(length = 8) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getInitials(name) {
    var splitName = name.split(' ')
    if (splitName.length === 1 ) return splitName[0].charAt(0).toUpperCase()
    return (splitName[0].charAt(0)+splitName[1].charAt(0)).toUpperCase()
}