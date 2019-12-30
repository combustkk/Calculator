const keys = document.querySelectorAll("keyPad");
const result = document.querySelector("#result");
window.addEventListener('keydown', event=>{
  console.log(event.keyCode);
  let key = document.querySelector(`[data-key="${event.keyCode}"]`);
  if(key)
  {
    result.textContent += key.value;
    key.classList.add("btnActive");
  }
});
