"use strict";
module.exports = function ($translate) {

    var vm = this;
    vm.model = {
        currentLang: $translate.use()
    }

    vm.viewApi = {
        setLang: function (lang) {
            vm.model.currentLang = lang;
            $translate.use(lang);
        },
        getCurrentLang: function () {
            return $translate.use();
        }
    }
}
