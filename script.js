const textDiv = document.querySelector(".text");
const textArea = document.querySelector(".text-area");

const actionDiv = document.querySelector(".action");

const ansverDiv = document.querySelector(".ansver");
const ansverYes = document.querySelector(".ansver-yes");
const ansverNo = document.querySelector(".ansver-no");

const addPropertyDiv = document.querySelector(".add-property");
const inputProperty = document.querySelector(".input-property");
const buttonProperty = document.querySelector(".button-property");

const addObjectDiv = document.querySelector(".add-object");
const inputObject = document.querySelector(".input-object");
const buttonObject = document.querySelector(".button-object");

const resultTestDiv = document.querySelector(".result-test");
const resultButton = document.querySelector(".result-button");

resultButton.onclick = () => startTest();

let propertys = [
    "Мягкий",
    "Круглый",
    "Квадратный",
    "Живой",
    "Неживой",
    "Мокрый",
    "Птица",
    "Млекопетающее",
    "Твёрдый"
];

let objects = [
    {name: "Кот",   prop1: 0, prop2: 1},
    {name: "Скала", prop1: 4, prop2: 8},
];

(function init()
{
    textDiv.style.display = "flex";
    actionDiv.style.display = "flex";
    ansverDiv.style.display = "flex";
    addPropertyDiv.style.display = "none";
    addObjectDiv.style.display = "none";
    resultTestDiv.style.display = "none";
    startTest();    
}())

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function startTest()
{
    addObjectDiv.style.display = "none";
    resultTestDiv.style.display = "none";
    ansverDiv.style.display = "flex";

    let propCopy  = [];
    for(let i = 0; i < propertys.length; i++)
    {
        propCopy.push(i);
    }

    let ansver = [];

    function buttonYes(countant)
    {
        ansver.push(propCopy[countant]);
        propCopy.splice(countant,1);
        func();
    }
    
    function buttonNo(countant)
    {
        propCopy.splice(countant,1);
        func();
    }

    function endQuestionNegative(ansver)
    {
        ansverDiv.style.display = "none";
        inputProperty.value = '';
        inputObject.value = '';
        if(ansver.length < 2)
        {
            addPropertyDiv.style.display = "flex";
            let text = ansver.length === 0 ? `Объект не найден, добавьте свойство.` : `Добавьте второе свойство.`;
            textArea.innerText = text;
            buttonProperty.onclick = () =>{
                propertys.push(inputProperty.value);
                ansver.push(propertys.length - 1);
                endQuestionNegative(ansver);
            }
            return 0;
        }
        else
        {
            addPropertyDiv.style.display = "none";
            addObjectDiv.style.display = "flex";
            textArea.innerText = `Введите название объекта.`;
            inputObject.focus();
            buttonObject.onclick =  () => {
                objects.push({name: inputObject.value, prop1: ansver[0], prop2: ansver[1]})
                inputObject.value = '';
                endQuestionPositive(ansver);
            }
            return 0;
        }
    }

    function endQuestionPositive(ansver)
    {   
        let valid = objects.some((object) =>
            ((object.prop1 === ansver[0] && object.prop2 === ansver[1]) ||
            ( object.prop2 === ansver[0] && object.prop1 === ansver[1]))
        );

        if(valid)
        {
            ansverDiv.style.display = "none";
            addObjectDiv.style.display = "none";
            resultTestDiv.style.display = "flex";
            let name = objects.filter((object) => 
                ((object.prop1 === ansver[0] && object.prop2 === ansver[1]) ||
                ( object.prop2 === ansver[0] && object.prop1 === ansver[1]))
            )[0].name;
            textArea.innerText = `Вы загадали "${name}"!`;
        }
        else
        {
            ansverDiv.style.display = "none";
            addObjectDiv.style.display = "flex";
            textArea.innerHTML = `Такого объекта нет в базе.<br>Введите его название.`;
            inputObject.focus();
            buttonObject.onclick =  () => {
                objects.push({name: inputObject.value, prop1: ansver[0], prop2: ansver[1]});
                inputObject.value = '';
                endQuestionPositive(ansver);
            }
        }
    }

    const func = () =>{
        if(ansver.length === 2)
        { 
            endQuestionPositive(ansver);
            return 0;
        }
        else if(propCopy.length === 0) 
        {
            endQuestionNegative(ansver);
            return 0;
        }

        let countant = getRandom(0,propCopy.length-1);
        
        textArea.innerText = `Угадываемый объект "${propertys[propCopy[countant]]}"?`;
        ansverYes.onclick = ()=>buttonYes(countant);
        ansverNo.onclick = ()=>buttonNo(countant);
    };

    func();
}

