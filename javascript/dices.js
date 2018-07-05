'use strict';

var diceContainer = document.getElementById('dice-container-left');
var box = document.getElementById('box1');
var diceNumber = document.getElementById('dice-number');
var buttonLaunch = document.getElementById('button-launch');
var total1Element = document.getElementById('total1');
var total2Element = document.getElementById('total2');
var numberOfDices = 0;
var total1 = 0;
var total2 = 0;
var dropAllowed = false;

document.getElementById('button-launch').addEventListener('click', launchDices);
document.getElementById('button-restart').addEventListener('click', restartAndPrintDices);
document.getElementById('dice-number').addEventListener('click', printDices);

function launchDices() {
  var diceThrow;
  var dices = document.getElementsByClassName('dice');
  var dice;

  if (dices.length > 0) {
    for (var i = 0; i < dices.length; i++) {
      diceThrow = Math.floor(Math.random() * 6) + 1;
      dice = document.getElementById('dice' + (i + 1));
      dice.className = 'dice dice-' + diceThrow; 
      dice.name = diceThrow;
    }
  
    buttonLaunch.setAttribute('disabled', 'disabled');
    dropAllowed = true;
  }
}

function restart() {
  var dices = document.getElementsByClassName('dice');
  var numberOfDices = dices.length

  total1 = 0;
  total2 = 0;
  total1Element.innerText = 'Total: ' + total1;
  total2Element.innerText = 'Total: ' + total2;

  for (var i = 0; i < numberOfDices; i++) {
    dices[0].remove();
  }

  buttonLaunch.removeAttribute('disabled');
  dropAllowed = false;
}

function printDices() {
  var newDice;

  restart();

  for (var i = 1; i <= diceNumber.value; i++) {
    newDice = document.createElement('div');
    newDice.id = 'dice' + i;
    newDice.className = 'dice dice-1';
    newDice.name = i;
    newDice.setAttribute('draggable', 'true');
    newDice.setAttribute('ondragstart', 'drag(event)');
    diceContainer.appendChild(newDice);
  }
}

function restartAndPrintDices() {
  restart();
  printDices();
}

function allowDrop(ev) {
  if (dropAllowed) {
    ev.preventDefault();
  }
}

function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  
  var data = ev.dataTransfer.getData('text');
  var dice = document.getElementById(data);
  
  ev.target.appendChild(dice);
  if (ev.target.id === 'box1') {
    total1 += dice.name;
    total1Element.innerText = 'Total: ' + total1;
  } else {
    total2 += dice.name;
    total2Element.innerText = 'Total: ' + total2;
  }

  dice.removeAttribute('draggable');
}
