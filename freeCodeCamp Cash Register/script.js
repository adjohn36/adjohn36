let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

const purchase = (input) => {
  cash.value = input;
    if (cash.value < price) {
      alert("Customer does not have enough money to purchase the item");
      return;
    }
    if (cash.value = price) {
      changeDue.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
      return;
    }
    if (cash.value > price) {
      changeDue.innerHTML = `<p>Status: OPEN`
    }
}


purchaseBtn.addEventListener("click", () => {
  purchase(input);
  return;
});

cash.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    purchase(input);
  }});