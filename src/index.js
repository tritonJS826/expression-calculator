function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  let exprArr = expr.split(' ').join('').split(''); //избавимся от пробелов
  if (isDevideByZero(exprArr)) throw "TypeError: Division by zero.";
  if (!isBracketsPaired(exprArr)) throw "ExpressionError: Brackets must be paired";
  exprArr = createArrWithNumbers(exprArr);
  //за проход рассчитываем значение в одних скобках
  if (isBracketsExist(exprArr)) do {
    let lind = indexOfLeftBracket(exprArr);
    let rind = indexOfRightBracket(exprArr);
    let bracketsEqual = calcWithoutBrackets(exprArr.slice(lind + 1, rind));
    exprArr.splice(lind, rind - lind + 1, bracketsEqual);
  } while (isBracketsExist(exprArr));

  return Math.round(calcWithoutBrackets(exprArr)*10000)/10000;
}

module.exports = {
  expressionCalculator
}


function isBracketsExist(arr) {
  if (arr.includes('(')) return true;
  return false;
}

function isDevideByZero(arr) {
  answer = false;
  arr.forEach((elem, ind) => {
    if (elem == '/' && arr[ind + 1] == '0') answer = true;
  });
  return answer;
}

function isBracketsPaired(arr) {
  let outArr = arr.join('').split('');
  let left = 0;
  let right = 0;
  outArr.forEach(elem => {
    if (elem === '(') left++;
    if (elem === ')') right++;
  });
  if (left === right) {
    return true;
  } else {
    return false;
  }
}

//находит индекс крайней правой "("
function indexOfLeftBracket(expr) {
  let right
  return expr.lastIndexOf('(', indexOfRightBracket(expr))
}

//находит индекс крайней левой ")"
function indexOfRightBracket(expr) {
  return expr.indexOf(')');
}

function createArrWithNumbers(expr) {
  //вставим пробелы вокруг  не чисел
  outputArr = [];
  expr.forEach((elem, ind, arr) => {
    if (isNaN(Number(elem))) {
      outputArr.push(' ');
      outputArr.push(elem);
      outputArr.push(' ');
    } else {
      outputArr.push(elem);
    };
  });
  outputArr = outputArr.join('').split(' ');
  outputArr.forEach((elem, ind, arr) => {
    if (elem === '') {
      arr = arr.splice(ind, 1); //убираем лишние пустые элементы
    } else {
      if (!isNaN(Number(elem))) arr[ind] = Number(elem); //преврвщаем числовые строки в числа
    }
  });
  return outputArr;
}

function calcWithoutBrackets(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '*') {
      arr.splice(i - 1, 3, arr[i - 1] * arr[i + 1]);
      i--;
    };
    if (arr[i] === '/') {
      arr.splice(i - 1, 3, arr[i - 1] / arr[i + 1]);
      i--
    };
  };

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '+') {
      arr.splice(i - 1, 3, arr[i - 1] + arr[i + 1]);
      i--;
    };
    if (arr[i] === '-') {
      arr.splice(i - 1, 3, arr[i - 1] - arr[i + 1]);
      i--;
    };
  };


return arr[0];
}
