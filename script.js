

const keys = document.querySelectorAll("#keyPad > button");
const result = document.querySelector("#result");
const operatorStack = new Array();
const operandStack = new Array();
const precedence =
{
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};

let Process = function(op, op1, op2)
{
  this.op = op;
  this.op1 = op1;
  this.op2 = op2;
  
}

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};


function infixAlgo(string)
{
  const parsedString = string.match(/[\d\.]+|[\/\*\+-]/g);
  for(let token in parsedString)
  {
    if(isNaN(token))
    {
      operandStack.push(parseInt(token, 10));
    }
    else {
      if(operatorStack.length == 0)
      {
        operatorStack.push(token);
      }
      else
      {
        while(operatorStack.last()>=token && operatorStack.length != 0)
        {

        }
      }
    }
  }
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
