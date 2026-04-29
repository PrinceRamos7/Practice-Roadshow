const form = document.getElementById("form");
const tableBody = document.getElementById("tableBody");

let editRow = null;

function loadUsers() {
  tableBody.innerHTML = "Loading...";

  fetch("https://jsonplaceholder.typicode.come/users")
    .then((res) => res.json())

    .then((data) => {
      tableBody.innerHTML = "";

      data.forEach((user) => {
        addRow({
          name: user.name,
          category: user.category,
          quantity: user.quantity,
        });
      });
    })

    .catch(() => {
      tableBody.innerHTML = "<tr><td colspan='4'>Failed to load data</td></tr>";
    });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const quantity = document.getElementById("quantity").value;

  if (!name || !category || !quantity) {
    alert("All feilds are required");
    return;
  }

  const data = {
    name,
    category,
    quantity,
  };

  if (editRow) {
    editRow.children[0].innerText = name;
    editRow.children[1].innerText = category;
    editRow.children[2].innerText = quantity;

    editRow = null;

    alert("Updated");

    return;
  }

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => {
      addRow(data);
      form.reset();
      alert("Saved");
    })

    .catch(() => {
      alert("Error API");
    });
});

function addRow(data) {
  const row = document.createElement("tr");

  row.innerHTML = `
    
    <td class="border p-2"> ${data.name} </td>
    <td class="border p-2"> ${data.category} </td>
    <td class="border p-2"> ${data.quantity} </td>
    <td class="border p-2">
        <button onclick="editData(this)" class="bg-yellow-500 text-white px-1 mr-2">
            Edit
        </button>

        <button
                onclick="deleteRow(this)"
                class="bg-red-500 text-white px-2 py-1"
            >
            Delete
        </button>

    </td>
    
    `;

  tableBody.appendChild(row);
}

function editData(btn) {
  editRow = btn.parentElement.parentElement;

  document.getElementById("name").value = editRow.children[0].innerText;
  document.getElementById("category").value = editRow.children[1].innerText;
  document.getElementById("quantity").value = editRow.children[2].innerText;
}
function deleteRow(btn) {
  btn.parentElement.parentElement.remove();

  if (deleteRow) {
    alert("Deleted");
    return;
  }
}
