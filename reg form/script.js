const form = document.getElementById("studentForm");
const tableBody = document.getElementById("tableBody");

let editRow = null;

//ADD
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let date = document.getElementById("date").value.trim();

  let valid = true;

  document.getElementById("nameError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("phoneError").innerText = "";
  document.getElementById("dateError").innerText = "";

  //NAME VALIDATION
  if (name === "") {
    document.getElementById("nameError").innerText = "Name is required";
    valid = false;
  }

  //EMAIL VALIDATION

  if (email === "") {
    document.getElementById("emailError").innerText = "Email is required";
    valid = false;
  } else if (!email.includes("@")) {
    document.getElementById("emailError").innerText = "Invalid email";
    valid = false;
  }

  //PHONE VALIDATION

  if (phone === "") {
    document.getElementById("phoneError").innerText = "Phone is required";
    valid = false;
  } else if (!/^\d{11}$/.test(phone)) {
    document.getElementById("phoneError").innerText = "Phone must be 11 digits";
    valid = false;
  }

  //DATE VALIDATION
  if (date === "") {
    document.getElementById("dateError").innerText = "Date is required";
    valid = false;
  }

  if (!valid) return;

  const data = { name, email, phone, date };

  if (editRow !== null) {
    editRow.children[0].innerText = data.name;
    editRow.children[1].innerText = data.email;
    editRow.children[2].innerText = data.phone;
    editRow.children[3].innerText = data.date;

    editRow = null;
    form.reset();

    document.querySelector("button[type='submit']").innerText = "Submit";
    alert("Record updated successfully!");
    return;
  }

  //API
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => {
      addToTable(data);
      form.reset();
      alert("Submitted successfully!");
    })
    .catch(() => {
      alert("Something went wrong. Please try again.");
    });
});

//ACTIONS

function addToTable(data) {
  const row = document.createElement("tr");

  row.innerHTML = `
        <td class="border p-2">${data.name}</td>
        <td class="border p-2">${data.email}</td>
        <td class="border p-2">${data.phone}</td>
        <td class="border p-2">${data.date}</td>
        <td class="border p-2 space-x-2">
            <button onclick="editData(this)" class="bg-yellow-500 text-white px-2 py-1 rounded">
                Edit
            </button>

            <button onclick="deleteRow(this)" class="bg-red-500 text-white px-2 py-1 rounded">
                Delete
            </button>
        </td>
    `;

  tableBody.appendChild(row);
}

//EDIT
function editData(btn) {
  editRow = btn.parentElement.parentElement;

  document.getElementById("name").value = editRow.children[0].innerText;
  document.getElementById("email").value = editRow.children[1].innerText;
  document.getElementById("phone").value = editRow.children[2].innerText;

  document.querySelector("button[type='submit']").innerText = "Update";
}

//DELETE
function deleteRow(btn) {
  btn.parentElement.parentElement.remove();

  if (editRow === btn.parentElement.parentElement) {
    editRow = null;
    form.reset();
    document.querySelector("button[type='submit']").innerText = "Submit";
  }
}
