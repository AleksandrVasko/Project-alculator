'use sctrict';

let mainHeader = document.getElementsByTagName("h1")[0].getElementsByClassName("total-input");
let heandlerBtn1 = document.getElementsByClassName("handler_btn")[0].getElementsByClassName("total-input");
let heandlerBtn2 = document.getElementsByClassName("handler_btn")[1].getElementsByClassName("total-input");
let screenBtn = document.querySelector(".screen-btn").getElementsByClassName("total-input");
let otherItemsPercent = document.querySelectorAll(".percent.other-items");
let otherItemsNumber = document.querySelectorAll(".number.other-items");
let inputRange = document.querySelector(".rollback>input");
let span = document.querySelector(".rollback>span");
let screensBlocks = document.querySelectorAll("screen");
//let inputs = document.getElementsByClassName("total-input"); 

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 100,
    servicePercentPrice: 0,
    services: {},
    start: function () {
        appData.asking();
        appData.addPrisec();
        appData.getFullPrice();
        appData.getServicePercentPrice();
        appData.getTitle();
        appData.logger();
    },
    isNumber: function (num) {
        return !isNaN(parseFloat(num) && isFinite(num));
    },
    asking: function () {
        let title = '';

        do {
        title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
        } while (!appData.toString(title));
        
        for (let i = 0; i < 2; i++) {
            let name = '';
            
            do {
            name = prompt('Какие типы экранов нужно разработать?');
            } while  (!appData.toString(name));
            
            let price = 0;
            
            do {
                price = +prompt('Сколько будет стоить данная работа?');
            } while (!appData.isNumber(price));
            
            appData.screens.push({id: i, name: name, price: price});
        }

        for (let i = 0; i < 2; i++) {
            let name = '';

            do {
            name = prompt('Какой дополнительный тип услуги нужен?');
            } while (!appData.toString(name));
            
            let price = 0;
            
            do {
                price = prompt('Сколько это будет стоить?');
            } while (!appData.isNumber(price));
            
            appData.services[name] = +price; 
        }
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    addPrisec: function() {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }
        for(let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },
    getFullPrice: function () {
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
    },
    getServicePercentPrice: function () {
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },
    getTitle: function () {
        appData.title = appData.title.trim[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
    },
    getRollbackMessage: function (price) {
        if (price >= 30000) {
            return 'Даем скидку в 10 %';
        } else if (price >= 15000 && price < 30000) {
            return 'Даем скидку в 5 %';
        } else if (price >= 0 && price < 15000) {
            return 'Скидка не предусмотрена';
        } else {
            return 'Что то пошло не так';
        }
    },
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    },
};

//appData.start();

console.log(mainHeader);








