module.exports = function () {

    var getItem = function (item) {
        var result = JSON.parse(localStorage.getItem(item));

        return result;
    };

    var setItem = function (value, item) {
        localStorage.setItem(value, JSON.stringify(item));
    };

    return {
        getItem: getItem,
        setItem: setItem
    }

};
