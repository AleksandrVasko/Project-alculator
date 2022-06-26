'use strict';

let title = document.querySelector('#title');
let adaptive;
let services = {};

let fullPrice = 0;

let header = document.getElementsByTagName('h1')[0];
let startBtn = document.getElementsByClassName('handler_btn')[0];
let resetBtn = document.getElementsByClassName('handler_btn')[1];
let plusBtn = document.querySelector('.screen-btn');

let otherItemsPercent = document.querySelectorAll('.other-items.percent');
let otherItemsNumber = document.querySelectorAll('.other-items.number');
let inputTypeRange = document.querySelector('.rollback>.main-controls__range>input');
let span = document.querySelector('.rollback>.main-controls__range>span');

let inputs = document.getElementsByClassName('total-input');
let screens = document.querySelectorAll('.screen');

let total = document.getElementsByClassName('total-input')[0];
let totalCount = document.getElementsByClassName('total-input')[1];
let totalCountOther = document.getElementsByClassName('total-input')[2];
let fullTotalCount = document.getElementsByClassName('total-input')[3];
let totalCountRollback = document.getElementsByClassName('total-input')[4];

let inputRange = document.querySelectorAll('.rollback>.main-controls__range>input')[0];
let spanRollback = document.querySelector('.range-value');


const appData = {
    totalCount: 0,
    servicePercentPrice: 0,
    rollback: 0,
    fullPrice: 0,
    servicesPricesPercent: 0,
    servicesPricesNumber: 0,
    screenPrice: 0,
    screens: [],
    servicesPercent: {},
    servicesNumber: {},
    init: function () {
        appData.getTitle();
        startBtn.addEventListener('click', appData.start, false);
        plusBtn.addEventListener('click', appData.addScreenBlock);
        inputRange.addEventListener('input', appData.addRollback);
        // totalCount.value = appData.totalCount
    },
    getTitle: function () {
        document.title = title.textContent;
    },
    start: function () {
        if (appData.isEmpty()) {
            appData.addScreens();
            appData.addServices();
            appData.addPrices();
            appData.showResult();
            appData.reset();
        }
    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCountOther.value = appData.servicesPricesPercent + appData.servicesPricesNumber;
        fullTotalCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;
        totalCount.value = appData.totalCount;
    },
    addScreens: function () {
        screens = document.querySelectorAll('.screen');
        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: input.value
            });
        });
    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
    },
    addServices: function () {
        otherItemsPercent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });
        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addPrices: function () {
        appData.screenPrice = appData.screens.reduce(function (sum, current) {
            return sum + (+current.price);
        }, 0);
        for (let key in appData.servicesNumber) {
            appData.servicesPricesNumber += +appData.servicesNumber[key];
        }
        for (let key in appData.servicesPercent) {
            appData.servicesPricesPercent += +appData.screenPrice * (appData.servicesPercent[key] / 100);
        }

        appData.fullPrice = appData.screenPrice + appData.servicesPricesPercent + appData.servicesPricesNumber;

        appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));

        appData.totalCount = appData.screens.reduce(function (sum, current) {
            return sum + (+current.count);
        }, 0);


    },
    addRollback: function () {
        appData.rollback = +inputRange.value;
        spanRollback.textContent = (`${appData.rollback}%`);
    },
    isString: function (str) {
        return (isNaN(str)) && !(str.length > str.trim().length);
    },

    logger: function () {
    },
    switch: function () {
        switch (true) {
            case (fullPrice >= 30000):
                console.log("Даем скидку в 10 %");
                break;
            case (fullPrice >= 15000 && fullPrice < 30000):
                console.log("Даем скидку в 5 %");
                break;
            case (fullPrice > 0 && fullPrice < 15000):
                console.log("Скидка не предусмотрена");
                break;
            case (fullPrice <= 0):
                console.log("Что то пошло не так");
                break;
            default:
                break;
        }
    },
    isEmpty: function () {
        let listOfScreensInputsForCheck = document.querySelectorAll(".screen .main-controls__input input");
        let listOfSelectsForCheck = document.querySelectorAll(".screen>.main-controls__select>select");
        let listOfValuesFromScreens = {};
        let listOfOptionsFromSelects = {};
        let result = true;
        listOfScreensInputsForCheck.forEach(function (element, index) {
            listOfValuesFromScreens[index] = element.value;
        });
        listOfSelectsForCheck.forEach(function (element, index) {
            listOfOptionsFromSelects[index] = element.selectedIndex;
        });


        for (const key in listOfValuesFromScreens) {
            if (!listOfValuesFromScreens[key]) {
                result = false;
                alert('Выберите количество экранов');
                break;

            }
        }
        for (let i = 0; i < listOfSelectsForCheck.length; i++) {
            if (!listOfSelectsForCheck[i].value) {
                result = false;
                alert('Выберите тип экрана');
                break;
            }

        }
        return result;
    },
};

appData.init();