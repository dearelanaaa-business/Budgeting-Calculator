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
  const salary = parseFloat(document.getElementById("salary").value) || 0;
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

// Print page
function printReport() {
  window.print();
}
