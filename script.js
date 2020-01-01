

const keys = document.querySelectorAll("#keyPad > button");
const result = document.querySelector("#result");

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
      console.log(operandStack);
    }
    else {
      if(operatorStack.length == 0)
      {
        operatorStack.push(token);
        console.log(operatorStack);
      }
      else
      {
        while(precedence[operatorStack.last()]>=precedence[token] && operatorStack.length != 0)
        {
          let op2 = operandStack.pop();
          let op1 = operandStack.pop();
          operandStack.push(calculate(operatorStack.pop(), op1, op2));
          console.log(operandStack);
        }
        operatorStack.push(token);
      }
    }
  }
  while(operatorStack.length != 0)
  {
    let op2 = operandStack.pop();
    let op1 = operandStack.pop();
    operandStack.push(calculate(operatorStack.pop(), op1, op2))
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
  key.addEventListener("click", ()=>pressKeyEffect(key));
});

window.addEventListener('keydown', event=>{
  console.log(event.key);
  let key = document.querySelector(`[value='${event.key}']`);
  if(event.key === "Backspace")
  {
    backspace();
    pressKeyEffect(key);
  }else{
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
  else {
    if(key)
    {
      result.textContent += key.value;
    }
  }
});
