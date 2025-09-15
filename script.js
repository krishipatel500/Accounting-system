let entries = [];

function addEntry() {
  const type = document.getElementById("type").value;
  const product = document.getElementById("product").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);

  if (!product || isNaN(amount) || amount <= 0) {
    alert("Please enter valid name and amount!");
    return;
  }

  entries.push({ type, product, amount });
  renderTable();
  clearForm();
}



function renderTable() {
  const table = document.getElementById("entryTable");
  table.innerHTML = "";

  entries.forEach((entry, index) => {
    table.innerHTML += `
      <tr>
        <td class="${entry.type === 'Credit' ? 'credit' : 'debit'}">${entry.type}</td>
        <td>${entry.product}</td>
        <td class="credit">${entry.type === 'Credit' ? entry.amount : ''}</td>
        <td class="debit">${entry.type === 'Debit' ? entry.amount : ''}</td>
        <td class="actions">
          <button class="edit" onclick="editEntry(${index})">Edit</button>
          <button class="delete" onclick="deleteEntry(${index})">Delete</button>
        </td>
      </tr>
    `;
  });

  calculateTotals();
}



function calculateTotals() {
  let totalCredit = 0, totalDebit = 0;

  entries.forEach(entry => {
    if (entry.type === "Credit") totalCredit += entry.amount;
    else totalDebit += entry.amount;
  });

  document.getElementById("totalCredit").innerText = totalCredit;
  document.getElementById("totalDebit").innerText = totalDebit;

  // Difference calculation
  const difference = totalCredit - totalDebit;
  const diffCell = document.getElementById("difference");

  if (difference === 0) {
    diffCell.innerText = "0";
    diffCell.classList.remove("red");
    diffCell.classList.add("green");
  } else {
    diffCell.innerText = difference;
    diffCell.classList.remove("green");
    diffCell.classList.add("red");
  }

  // Enable Save button only if balanced
  const saveBtn = document.getElementById("saveBtn");
  if (difference === 0 && totalCredit !== 0) {
    saveBtn.classList.add("enabled");
  } else {
    saveBtn.classList.remove("enabled");
  }
}




function deleteEntry(index) {
  entries.splice(index, 1);
  renderTable();
}

function editEntry(index) {
  const entry = entries[index];
  document.getElementById("type").value = entry.type;
  document.getElementById("product").value = entry.product;
  document.getElementById("amount").value = entry.amount;

  deleteEntry(index);
}

function clearForm() {
  document.getElementById("product").value = "";
  document.getElementById("amount").value = "";
}
