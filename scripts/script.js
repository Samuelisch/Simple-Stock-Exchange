/* dropdown menu function */
const menuBtn = document.querySelector('.dropdown-btn');
const dropMenu = document.querySelector('.drop-content');
const plusBtn = document.querySelector('.plus-minus-btn');
const plusBtnContainer = document.querySelector('.plus-minus');
const amount = document.querySelector('.transact-amount');

function outside(e) {
  if (!e.target.matches('.dropdown-btn') && (!e.target.matches('.dropdown-icon'))) {
    if (dropMenu.classList.contains('show-dropdown')) {
      dropMenu.classList.remove('show-dropdown');
    }
  } else {
    dropMenu.classList.toggle('show-dropdown');
  }
  if (e.target.matches('.plus-minus-btn') || (e.target.matches('.plus-minus'))) {
    plusMinus();
  }
}

function plusMinus() {
  if (plusBtn.style.transform) {
    plusBtn.style.transform = null;
    plusBtn.textContent = "-";
    plusBtnContainer.style.backgroundColor = "rgb(156, 30, 30)";
    amount.style.color= "rgb(156, 30, 30)"
  } else {
    plusBtn.style.transform = "translateX(100%)"
    plusBtn.textContent = "+";
    plusBtnContainer.style.backgroundColor = "rgb(32, 146, 32)";
    amount.style.color= "rgb(32, 146, 32)";
  }
}

window.addEventListener('click', outside);