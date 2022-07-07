'use strict';

let adaptive;
let screens = document.querySelectorAll('.screen');
const services = {};
const fullPrice = 0;
const title = document.querySelector('#title');
const header = document.getElementsByTagName('h1')[0];
const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const plusBtn = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const inputTypeRange = document.querySelector('.rollback>.main-controls__range>input');
const span = document.querySelector('.rollback>.main-controls__range>span');
const inputs = document.getElementsByClassName('total-input');
const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];
const inputRange = document.querySelectorAll('.rollback>.main-controls__range>input')[0];
const spanRollback = document.querySelector('.range-value');


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
        this.getTitle();
        startBtn.addEventListener('click', this.start.bind(this));
        plusBtn.addEventListener('click', this.addScreenBlock);
        inputRange.addEventListener('input', this.addRollback);
        resetBtn.addEventListener('click', this.reset.bind(this));
    },
    getTitle: function () {
        document.title = title.textContent;
    },
    start: function () {
        if (this.isEmpty()) {
            startBtn.style.display = 'none';
            resetBtn.style.display = '';
            this.addScreens();
            this.addServices();
            this.addPrices();
            this.showResult();
            this.disable();
        }

    },
    showResult: function () {
        total.value = this.screenPrice;
        totalCountOther.value = this.servicesPricesPercent + this.servicesPricesNumber;
        fullTotalCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
        totalCount.value = this.totalCount;
    },
    addScreens: function () {
        screens = document.querySelectorAll('.screen');
        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: input.value
            });
        }.bind(this));
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
                this.servicesPercent[label.textContent] = +input.value;
            }
        }.bind(this));
        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        }.bind(this));
    },
    addPrices: function () {
        this.screenPrice = this.screens.reduce(function (sum, current) {
            return sum + (+current.price);
        }, 0);
        for (let key in this.servicesNumber) {
            this.servicesPricesNumber += +this.servicesNumber[key];
        }
        for (let key in this.servicesPercent) {
            this.servicesPricesPercent += +this.screenPrice * (this.servicesPercent[key] / 100);
        }

        this.fullPrice = this.screenPrice + this.servicesPricesPercent + this.servicesPricesNumber;

        this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)));

        this.totalCount = this.screens.reduce(function (sum, current) {
            return sum + (+current.count);
        }, 0);


    },
    addRollback: function () {
        this.rollback = +inputRange.value;
        spanRollback.textContent = (`${this.rollback}%`);
    },
    isString: function (str) {
        return (isNaN(str)) &&
            (str.length > str.trim().length);
    },
    disable: function () {
        document.querySelectorAll('select').forEach(element => {
            element.disabled = true;
        });
        document.querySelectorAll('input').forEach(element => {
            element.disabled = true;
        });
    },
    isEmpty: function () {
        let listOfScreensInputsForCheck = document.querySelectorAll('.screen .main-controls__input input');
        let listOfSelectsForCheck = document.querySelectorAll('.screen>.main-controls__select>select');
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
    reset: function () {
        startBtn.style.display = '';
        resetBtn.style.display = 'none';
        total.value = 0;
        totalCountOther.value = 0;
        fullTotalCount.value = 0;
        totalCountRollback.value = 0;
        totalCount.value = 0;
        this.totalCount = 0;
        this.servicePercentPrice = 0;
        this.rollback = 0;
        this.fullPrice = 0;
        this.servicesPricesPercent = 0;
        this.servicesPricesNumber = 0;
        this.screenPrice = 0;
        this.screens = [];
        this.servicesPercent = {};
        this.servicesNumber = {};

        document.querySelectorAll('select').forEach(element => {
            element.disabled = false;
        });
        document.querySelectorAll('.screen>.main-controls__input>input').forEach(element => {
            element.disabled = false;
        });
        const selected = document.querySelectorAll('select');
        const input = document.querySelectorAll('.screen>.main-controls__input>input');
        input.forEach(element => {
            element.value = '';
        });
        selected.forEach(element => {
            element.selectedIndex = 0;
        });



        console.log(selected);
        console.log(input);
    },
};

appData.init();