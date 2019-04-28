
const calculatorAdd = (a, b) => a + b;
const calculatorSubtract = (a, b) => a - b;
const calculatorMultiply = (a, b) => a * b;
const calculatorDivide = (a, b) => a / b;
const pushValues = () => {
	if(calculatorNum[numPos] === undefined) calculatorNum[numPos] = '';
	calculatorNum[numPos] += currentButton;
}
const pushDisplayNumbers = () => {
	displayText.push(currentButton);
	display.textContent = displayText.join('');
}
const addSigns = () => {
	displayText.push(currentOperator);
	display.textContent = displayText.join('');
}
const clearAll = () => {
 calculatorNum.length = 0;
 displayText.length = 0;
 currentOperator = null;
 currentButton = null;
 display.style.fontSize = '1.7em'
}
const fontSizeChange = () => {
	var currentFontSize = 1.7
	currentFontSize /= 2;
	return currentFontSize + 'em';
}
const numberClick = () => {
	if(currentButton === '.' && calculatorNum[0] === undefined){
		return;
	}
	if(currentButton === '.' && displayText.indexOf('.') > -1){
		return;
	}
	if(calculatorNum[0] === '0' && currentButton != '.'){
		return;
	}
	if(result === undefined){
	pushValues();
	pushDisplayNumbers();
}else if(result && currentOperator){
	pushValues();
	pushDisplayNumbers();
}
}
const operations = {
	'+': calculatorAdd,
	'-': calculatorSubtract,
	'X': calculatorMultiply,
	'/': calculatorDivide,
	'÷': calculatorDivide
};

const operationNames = Object.keys(operations);
const operate = (a, b, op) => operations[op](a, b);

const numbers = document.querySelectorAll('.numbers');
const display = document.querySelector('#display-text')
const operators = document.querySelectorAll('.operator')
const equals = document.querySelector('#equals')
const clear = document.querySelector('#clear')

let displayText = [];
let calculatorNum = [];
let currentOperator;
let currentButton;
let numPos = 0;
let result;

numbers.forEach(button => button.addEventListener('click', function(){
	currentButton = this.textContent;
	numberClick();
}))

operators.forEach(operator => operator.addEventListener('click', function(){
	if(!currentOperator && currentButton){
	currentOperator = this.textContent;
	numPos++;
	addSigns();
}
}));

equals.addEventListener('click', function() {
if(currentOperator == '÷' && calculatorNum[1] == '0'){
	alert('Aren\'t you a cheeky fuken gaylord');
	clearAll();
	numPos--;
	display.textContent = '';
}

 result = operate(Number(calculatorNum[0]), Number(calculatorNum[1]), currentOperator);
 clearAll();
 numPos--
 displayText.push(result);
 pushDisplayNumbers();
 currentButton = result;
 calculatorNum[0] = result;
;
})

clear.addEventListener('click', function(){
	clearAll();
	display.textContent = '';
	result = undefined;
});
