/* dropdown menu function */
const menuBtn = document.querySelector('.dropdown.btn');
const dropMenu = document.querySelector('.drop-content');
const plusBtn = document.querySelector('.plus-minus-btn');
const transactForm = document.querySelector('.dropdown-transact');
const plusBtnContainer = document.querySelector('.plus-minus');
const amount = document.querySelector('.transact-amount');
const date = document.querySelector('.date');

function outside(e) {
  if (!e.target.matches('.dropdown')) {
    if (dropMenu.classList.contains('show-dropdown')) {
      dropMenu.classList.remove('show-dropdown');
    }
  } else {
    dropMenu.classList.toggle('show-dropdown');
  }
  /* slider */
  if (e.target.matches('.slider')) {
    plusMinus();
  }
  /* transact button */
  if (e.target.matches('.transact')) {
    document.querySelector('.transact').disabled = true;
    transactForm.classList.toggle('show-dropdown');
  }
}

function plusMinus() {
  if (plusBtn.style.transform) {
    plusBtn.style.transform = null;
    plusBtn.textContent = "-";
    plusBtnContainer.style.backgroundColor = "var(--red)";
    amount.style.color= "var(--red)"
  } else {
    plusBtn.style.transform = "translateX(100%)"
    plusBtn.textContent = "+";
    plusBtnContainer.style.backgroundColor = "var(--green)";
    amount.style.color= "var(--green)";
  }
}

function getDateToday() {
  function zerofill(i) {
    return (i < 10 ? '0' : '') + i;
  }
  let today = new Date;
  return `${today.getFullYear()}-${zerofill(today.getMonth() + 1)}-${zerofill(today.getDate())}`;
}

window.addEventListener('click', outside);
date.value = getDateToday();