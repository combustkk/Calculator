

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

function changeResult(keyValue)
{
  if(keyValue in precedence || keyValue === ".")
  {
    const str = result.textContent;
    if(str[str.length - 1] in precedence || str[str.length - 1] ===".")
    {
      alert("illegal expression");
      return;
    }
  }
  result.textContent += keyValue;
}

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
  if(parsedString[0] === "+" || parsedString[0] === "-")
  {
    operandStack.push(0);
  }
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
  key.addEventListener("click", ()=>
    {
      if(calculated && !(key.value in precedence))
      {
        result.textContent = "";
      }
      calculated = false;
      pressKeyEffect(key);
      if(key.value === "Backspace")
      {
        backspace();
      }
      else if(key.value === "=")
      {
        let res = infixAlgo(result.textContent);
        result.textContent = isNaN(res) ? "":res;
        calculated = true;
      }
      else
      {
        changeResult(key.value);
      }
    }
  );
});

window.addEventListener('keydown', event=>{
  //console.log(event.key);
  let key = document.querySelector(`[value='${event.key}']`);
  if(!isNaN(result.textContent) && calculated)
  {
    if((key && key.value in precedence))
    {
      calculated = false;
    }
    else if(key && event.key != "="){
      result.textContent = "";
      calculated = false;
    }
  }
  if(event.key === "Backspace")
  {
    backspace();
    pressKeyEffect(key);
  }
  else if(event.key === "=")
  {
    //console.log(result.textContent);
    if(result.textContent != "")
    {
      let res = infixAlgo(result.textContent);
      result.textContent = isNaN(res) ? "":res;
      calculated = true;
    }
  }
  else{
    pressKeyEffect(key);
  }
  if(key && event.key !== "Backspace" && event.key !== "=")
  {
    changeResult(key.value);
  }
});
