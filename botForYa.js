// ==UserScript==
// @name         bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==



function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

let yaInput = document.getElementById("text");//Input для ввода строки поиска
let btnK = document.getElementsByClassName("button mini-suggest__button button_theme_websearch button_size_ws-head i-bem button_js_inited")[0]; //Кнопка поиска в Yandex, создаем коллекцию по наименов.класса
let words = ["Гобой","Флейта","Как звучит флейта","Балалайка","Фагот","Скрипка","Саксофон"];//массив значений для поиска
let word = words[getRandom(0,words.length)];//рандомные значения для списка
if (btnK!=undefined){ // Проверка существования кнопки поиска yandex
    let i = 0;
    let timerId = setInterval(function(){   //задали функцию ввода слова в поисковую строку с задержкой 200мс
        yaInput.value = yaInput.value + word[i];  //прибавляем очередную букву
        i++;
        if(i == word.length){
            clearInterval(timerId);
            btnK.click();
        }
    },200);
}else{
    let pageNum = Number(document.getElementsByClassName("pager__item pager__item_current_yes pager__item_kind_page")[0].innerText);
    let linkIsFound = false;
    let links = document.links;
    let pnnextFound = document.querySelectorAll("a");
    let pnnext;
    for(let i=0; i<links.length; i++){
        let link = links[i]
        if(link.href.includes("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")){
            setTimeout(()=>{link.click();},1000);
            linkIsFound = true;
            break;
        }
    }
    if(!linkIsFound && pageNum<10){
        for(let i=0; i<pnnextFound.length;i++){
            if(pnnextFound[i].ariaLabel==="Следующая страница"){
                pnnext=pnnextFound[i];
                break;
            }
        }
        setTimeout(function(){pnnext.click();},1000);
    }else if (!linkIsFound){
        location.href = "https://yandex.ru/";
    }
}
