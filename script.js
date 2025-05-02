// Switch between Monthly and Annual tabs
function openTab(evt, tabName) {
  const tabcontents = document.querySelectorAll(".tabcontent");
  const tablinks = document.querySelectorAll(".tablink");

  tabcontents.forEach(content => content.classList.remove("active"));
  tablinks.forEach(link => link.classList.remove("active"));

  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

// Auto-calculate monthly totals
function calculateMonthly() {
  const salary = parseFloat(document.getElementById("monthly-salary").value) || 0; // Updated to "monthly-salary"
  const inputs = document.querySelectorAll("#Monthly .subcategory input");

  let total = 0;
  inputs.forEach(input => {
    total += parseFloat(input.value) || 0;
  });

  document.getElementById("monthly-total-expenses").textContent = total.toFixed(2);
  document.getElementById("monthly-remaining-balance").textContent = (salary - total).toFixed(2);
}


// Auto-calculate annual totals
function calculateAnnual() {
  const salary = parseFloat(document.getElementById("annual-salary").value) || 0;
  const inputs = document.querySelectorAll("#Annual .subcategory input");

  let total = 0;
  inputs.forEach(input => {
    total += parseFloat(input.value) || 0;
  });

  document.getElementById("annual-total-expenses").textContent = total.toFixed(2);
  document.getElementById("annual-remaining-balance").textContent = (salary - total).toFixed(2);
}

// Clear all fields
function clearAll() {
  const inputs = document.querySelectorAll("input[type='number']");
  inputs.forEach(input => input.value = "");

  document.getElementById("monthly-total-expenses").textContent = "0";
  document.getElementById("monthly-remaining-balance").textContent = "0";
  document.getElementById("annual-total-expenses").textContent = "0";
  document.getElementById("annual-remaining-balance").textContent = "0";
}

// Print page with coding font, all labels, and total expenses in two columns
function printReport() {
  const activeTab = document.querySelector(".tabcontent.active");
  const printWindow = window.open("", "_blank");
  const isMonthly = activeTab.id === "Monthly";

  let html = `<html><head><title>Budget Report</title><style>
    body { font-family: 'Courier New', Courier, monospace; padding: 20px; margin: 0; display: flex; flex-direction: column; }
    h2 { margin-top: 30px; font-size: 20px; text-align: center; }
    h3 { margin-top: 20px; font-size: 18px; }
    p { margin: 3px 0; font-size: 14px; }
    .total-section { margin-top: 20px; font-weight: bold; font-size: 16px; text-align: center; }
    .category-container { page-break-inside: avoid; margin-bottom: 20px; }
    .subcategory { page-break-inside: avoid; }
    
    .columns { 
      display: grid; 
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px; 
      margin-top: 20px;
    }
    
    .column { 
      padding: 10px; 
      border: 1px solid #ccc; 
      background-color: #f9f9f9; 
    }

    @page { size: A4; margin: 10mm; }
  </style></head><body>`;

  html += `<h2>${isMonthly ? "Monthly" : "Annual"} Expenses Report</h2>`;

  // Two columns container
  html += `<div class="columns">`;

  const categoryContainers = activeTab.querySelectorAll(".category-container");

  let count = 0;
  categoryContainers.forEach(container => {
    const subInputs = container.querySelectorAll("input");
    const categoryTitle = container.querySelector("h3")?.textContent || "Category";

    // Start new column every 6 categories for better balance
    if (count % 6 === 0 && count !== 0) {
      html += `</div><div class="columns">`;  // Close and start new column container
    }

    html += `<div class="column"><h3>${categoryTitle}</h3>`;

    subInputs.forEach(input => {
      const label = container.querySelector(`label[for='${input.id}']`);
      const value = parseFloat(input.value) || 0;
      html += `<p>${label?.textContent || input.name}: RM ${value.toFixed(2)}</p>`;
    });
    html += `</div>`; // End column

    count++;
  });

  html += `</div>`; // End columns container

  // Add total expenses and remaining balance at the bottom
  const totalExpenses = isMonthly 
    ? document.getElementById("monthly-total-expenses").textContent 
    : document.getElementById("annual-total-expenses").textContent;

  const remainingBalance = isMonthly 
    ? document.getElementById("monthly-remaining-balance").textContent 
    : document.getElementById("annual-remaining-balance").textContent;

  html += `<div class="total-section">
            <h3>Total Expenses: RM ${totalExpenses}</h3>
            <h3>Remaining Balance: RM ${remainingBalance}</h3>
          </div>`;

  html += "</body></html>";
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.print();
}
