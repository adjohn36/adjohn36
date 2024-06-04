let price = 19.5;
let cid = [
  ["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]
];

const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

let currencyUnits = [
  ["PENNY", .01],
  ["NICKEL", .05],
  ["DIME", .1],
  ["QUARTER", .25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100]
];



const purchase = (cash, price) => {
  const cashValue = parseFloat(cash.value);
  const change = (cashValue - price).toFixed(2);
  
  const reverseCid = [...cid].reverse();

    if (cashValue < price) {
      alert("Customer does not have enough money to purchase the item");
      return;
    }
    if (cashValue == price) {
      changeDue.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
      return;
    }

    const changeResult = getChange(change, cid);

    if (changeResult.status === "INSUFFICIENT_FUNDS" || changeResult.status === "CLOSED") {
      changeDue.innerHTML = `<p>Status: ${changeResult.status} ${(formatChange(changeResult.change))}</p>`;
    } else {
      let changeText = `<p>Status: OPEN: ${(formatChange(changeResult.change))}</p>`;
      changeDue.innerHTML = changeText.trim();
    }
    
}

const getChange = (change, cid) => {
  let totalCID = Number(cid.reduce((sum, [_,amount]) => sum + amount, 0).toFixed(2));
  if (totalCID < change) {
    return { status: "INSUFFICIENT_FUNDS", change: [] }
  }

  let changeArr = [];
  let remainingChange = change;

  for (let i = currencyUnits.length - 1; i >= 0; i--) {
    let unit = currencyUnits[i][0];
    let unitValue = currencyUnits[i][1];
    let unitInDrawer = cid[i][1];

    if (unitValue <= remainingChange && unitInDrawer > 0) {
      let amountFromUnit = 0;

      while(remainingChange >= unitValue && unitInDrawer > 0) {
        remainingChange = (remainingChange - unitValue).toFixed(2);
        unitInDrawer -= unitValue;
        amountFromUnit += unitValue;
      }

      if (amountFromUnit > 0) {
        changeArr.push([unit, amountFromUnit])
      }
    }
  }

  if (remainingChange > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] }
  }

  if (totalCID == change) {
      return { status: "CLOSED", change: cid }
  }
  return { status: "OPEN", change: changeArr }
  
}

const formatChange = changeArray => changeArray.map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`).join(" ");


purchaseBtn.addEventListener("click", () => {
  purchase(cash, price);
  return;
});

cash.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    purchase(cash, price);
  }});

  