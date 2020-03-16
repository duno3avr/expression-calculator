function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let map = {'+' : 1, '-' : 1, '*' : 2, '/' : 2}
    let str = expr.split(' ').join('');
    let stack = [];
    let array = [];
    let number = '';

    str.split('').forEach(e => {
        if(!isNaN(e)) {
            number += e;
        } else {
            if(number.length > 0) {
                array.push(number);
                number = '';
            }

            if(e === '(') {
                stack.push(e);
            } else if(e === ')') {
                while(stack.length != 0 && stack[stack.length-1] !== '(') {
                    array.push(stack.pop());
                }

                if(stack.length === 0) {
                    throw new Error("ExpressionError: Brackets must be paired");
                } else {
                    stack.pop();
                }
            } else {
                while(stack.length != 0 && map[e] <= map[stack[stack.length - 1]]) {
                    if(stack[stack.length - 1] === '(') {
                        throw new Error("ExpressionError: Brackets must be paired");
                    }
                    array.push(stack.pop());
                }
                stack.push(e);
            }
        }
    });

    if(number.length > 0) {
        array.push(number);
    }
    while(stack.length != 0) {
        let el = stack.pop();
        if(el === '(') {
            throw new Error("ExpressionError: Brackets must be paired");
        }
        array.push(el);
    }

    array.forEach(e => {
        if(!isNaN(e)) {
            stack.push(e);
        } else {
            let val1 = parseFloat(stack.pop());
            let val2 = parseFloat(stack.pop());

            if(e === '+') {
                stack.push(val2 + val1);
            } else if(e === '-') {
                stack.push(val2 - val1);
            } else if(e === '/') {
                if(val1 === 0) {
                    throw new Error("TypeError: Division by zero.");
                }
                stack.push(val2 / val1);
            } else if(e === '*') {
                stack.push(val2 * val1);
            }
        }
    });
    return stack.pop();

}

module.exports = {
    expressionCalculator
}