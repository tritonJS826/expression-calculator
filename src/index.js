function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  expr = expr.split(' ');
  if (isDevideByZero(expr)) throw "TypeError: Division by zero.";
  if (!isBracketsPaired(expr)) throw "ExpressionError: Brackets must be paired";
}

module.exports = {
  expressionCalculator
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
    return true
  } else {
    return false
  }
}
