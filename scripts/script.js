/* dropdown menu function */
const menuBtn = document.querySelector('.dropdown.btn');
const dropMenu = document.querySelector('.drop-content');
// history grid
const histGrid = document.querySelector('.history-grid');
// form selectors
const transactForm = document.querySelector('.dropdown-form');
const plusBtnContainer = document.querySelector('.plus-minus');
const plusBtn = document.querySelector('.plus-minus-btn');
const transactAmount = document.querySelector('.transact-amount');
const transactType = document.querySelector('.transaction-type');
const transactDate = document.querySelector('.date');
const transactIcon = document.querySelector('.color-icon');
const transactColor = document.querySelector('.color-select');
const transactPayee = document.querySelector('.transact-payee');
const formSubmit = document.querySelector('.submit-form');

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
    transactForm.classList.add('show-dropdown');
  }

  //Cancel/reset form
  if (e.target.matches('.cancel-submit')) {
    resetForm();
  }

  // Submit form
  if (e.target.matches('.submit-form')) {
    e.preventDefault();
    addHistoryCell();
    //addTransactColorSort();
  }
}

function addHistoryCell() {
  addTypeCell();
  addAmountCell();
  addDateCell();
}

function addTypeCell() {
  let icon = document.createElement('div');
  icon.className = 'history-icon';
  icon.style.backgroundColor = transactColor.value;
  let type = document.createElement('span');
  type.append(`${transactType.value}`);
  type.className = 'action-type';
  let cell = document.createElement('div');
  cell.className = 'cell';
  cell.appendChild(icon);
  cell.appendChild(type);
  histGrid.appendChild(cell);
}

function addAmountCell() {
  let cell = document.createElement('span');
  cell.className = 'cell action-amount';
  cell.append(`$${transactAmount.value}`);
  if (!plusBtnContainer.style.backgroundColor) {
    cell.style.color = 'var(--red)'
  } else {
    cell.style.color = plusBtnContainer.style.backgroundColor;
  }
  histGrid.appendChild(cell);
}

function addDateCell() {
  let cell = document.createElement('span');
  cell.className = 'cell action-date';
  cell.append(transactDate.value);
  histGrid.appendChild(cell);
}

function resetForm() {
  transactDate.value = getDateToday();
  transactAmount.value = '';
  transactType.value = '';
  transactIcon.style.backgroundColor = 'black';
  transactColor.value = '';
  transactPayee.value = '';
  document.querySelector('.transact').disabled = false;
  transactForm.classList.remove('show-dropdown');
  revertPlusBtn();
}

function revertPlusBtn() {
  plusBtn.value = 'minus';
  plusBtn.style.transform = null;
  plusBtn.textContent = "-";
  plusBtnContainer.style.backgroundColor = "var(--red)";
  transactAmount.style.color= "var(--red)"
}

function plusMinus() {
  if (plusBtn.style.transform) {
    revertPlusBtn();
  } else {
    plusBtn.value = 'plus';
    plusBtn.style.transform = "translateX(100%)"
    plusBtn.textContent = "+";
    plusBtnContainer.style.backgroundColor = "var(--green)";
    transactAmount.style.color= "var(--green)";
  }
}

function getDateToday() {
  function zerofill(i) {
    return (i < 10 ? '0' : '') + i;
  }
  let today = new Date;
  return `${today.getFullYear()}-${zerofill(today.getMonth() + 1)}-${zerofill(today.getDate())}`;
}

function colorChange() {
  if (this.value) {
    transactIcon.style.backgroundColor = this.value;
  } else {
    transactIcon.style.backgroundColor = 'rgb(15, 15, 15)';
  }
}

function limitDecimal() {
  if (this.value) {
    this.value = Number(this.value).toFixed(2);
  }
}

window.addEventListener('click', outside);
transactDate.value = getDateToday();
transactColor.addEventListener('change', colorChange);
transactAmount.addEventListener('change', limitDecimal);