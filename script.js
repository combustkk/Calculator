

const keys = document.querySelectorAll("#keyPad > button");
const result = document.querySelector("#result");
let calculated = false;
const precedence =
{
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};

function calculate(op, op1, op2)
{
  let result = 0;
  switch(op)
  {
    case "+":
      result = op1 + op2;
      break;
    case "-":
      result = op1 - op2;
      break;
    case "*":
      result = op1 * op2;
      break;
    case "/":
      if(op2 == 0)
      {
        alert("Can't divide by zero!");
        return NaN;
      }else
      {
        result = op1 / op2;
      }
      break;
    default:
      break;
  }
  return Math.round(result * 100) / 100;
}

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};


function infixAlgo(string)
{
  const operatorStack = new Array();
  const operandStack = new Array();
  const parsedString = string.match(/[\d\.]+|[\/\*\+-]/g);
  //console.log(parsedString);
  for(let i = 0; i < parsedString.length; ++i)
  {
    let token = parsedString[i];
    if(!isNaN(token))
    {
      operandStack.push(+token);
      //console.log(operandStack);
    }
    else {
      if(operatorStack.length == 0)
      {
        operatorStack.push(token);
        //console.log(operatorStack);
      }
      else
      {
        while(precedence[operatorStack.last()]>=precedence[token] && operatorStack.length != 0)
        {
          let op2 = operandStack.pop();
          let op1 = operandStack.pop();
          let res = calculate(operatorStack.pop(), op1, op2);
          if(isNaN(res))
          {
            return NaN
          }
          operandStack.push(res);
          //console.log(operandStack);
        }
        operatorStack.push(token);
      }
    }
  }
  while(operatorStack.length != 0)
  {
    let op2 = operandStack.pop();
    let op1 = operandStack.pop();
    let res = calculate(operatorStack.pop(), op1, op2);
    if(isNaN(res))
    {
      return NaN
    }
    operandStack.push(res);
  }
  return operandStack.last();
}


function backspace()
{
  let str = result.textContent;
  if(str.length != 0)
  {
    result.textContent = str.substring(0, str.length - 1);
  }

}

function pressKeyEffect(key)
{
  if(key)
  {
    key.classList.add("activeBtnColor");
    setTimeout((()=>
    {
      key.classList.remove("activeBtnColor");
    }), 100);
  }
};

keys.forEach((key)=>
{
  if(calculated)
  {
    result.textContent = "";
    calculated = false;
  }
  key.addEventListener("click", ()=>pressKeyEffect(key));
});

window.addEventListener('keydown', event=>{
  //console.log(event.key);
  let key = document.querySelector(`[value='${event.key}']`);
  if(key || event.key === "Enter")
  {
    if(calculated)
    {
      if(event.key !== "Enter")
      {
        result.textContent = "";
        calculated = false;
      }
    }
  }
  if(event.key === "Backspace")
  {
    backspace();
    pressKeyEffect(key);
  }
  else if(event.key === "Enter")
  {
    //console.log(result.textContent);
    if(result.textContent != "")
    {
      result.textContent = infixAlgo(result.textContent);
      calculated = true;
    }
  }
  else{
    pressKeyEffect(key);
  }
  if(event.key in precedence || event.key === ".")
  {
    const str = result.textContent;
    if(str[str.length - 1] in precedence || str[str.length - 1] ===".")
    {
      alert("illegal expression--");
    }
    else
    {
      result.textContent += key.value;
    }
  }
  else{
    if(key && event.key != "Backspace")
    {
      result.textContent += key.value;
    }
  }
});
