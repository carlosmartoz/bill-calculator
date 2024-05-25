// Array para almacenar los clientes
const clients = [];

// Función para agregar un cliente
function addClients() {
  const name = document.getElementById("name").value;
  const lastname = document.getElementById("lastname").value;
  const dni = document.getElementById("dni").value;
  const domicile = document.getElementById("domicile").value;
  const kw = parseInt(document.getElementById("kw").value);
  const debt = parseInt(document.getElementById("debt").value) || 0;

  const client = {
    name,
    lastname,
    dni,
    domicile,
    kw,
    debt,
    total: 0, // Este campo se calculará dinámicamente
  };

  calculateTotal(client);

  clients.push(client);

  showClients();

  cleanForm();
}

// Función para calcular el monto a pagar por cada cliente
function calculateTotal(client) {
  let KWcost;

  if (client.domicile === "Residencial") {
    KWcost = 2.25;
    if (client.kw > 2000) {
      client.total = client.kw * KWcost * 0.9; // 10% de descuento
    } else if (client.kw > 5000) {
      client.total = client.kw * KWcost * 0.85; // 15% de descuento
    } else {
      client.total = client.kw * KWcost;
    }
  } else if (client.domicile === "Comercial") {
    KWcost = 4.5;
    if (client.kw > 5000) {
      client.total = client.kw * KWcost * 0.9; // 10% de descuento
    } else if (client.kw > 7000) {
      client.total = client.kw * KWcost * 0.85; // 15% de descuento
    } else {
      client.total = client.kw * KWcost;
    }
  }

  // Si el cliente tiene debt, se suma al monto a pagar
  if (client.debt) {
    client.total += client.debt;
  }
}

// Función para mostrar la lista de clientes
function showClients() {
  const clientsContainer = document.getElementById("clientsContainer");

  clientsContainer.innerHTML = "";

  clients.forEach((client) => {
    const divClient = document.createElement("div");

    let discount = 0;

    if (client.domicile === "Residencial" && client.kw > 2000 && client.kw <= 5000) {
      discount = 10;
    } else if (client.domicile === "Residencial" && client.kw > 5000) {
      discount = 15;
    } else if (client.domicile === "Comercial" && client.kw > 5000 && client.kw <= 7500) {
      discount = 10;
    } else if (client.domicile === "Comercial" && client.kw > 7000) {
      discount = 15;
    }

    divClient.innerHTML = `
        <p><strong>${client.name} ${client.lastname}</strong> - DNI: <strong>${client.dni}</strong></p>
        <p>Tipo de Domicilio: <strong>${client.domicile}</strong></p>
        <p>Consumo KW: <strong>${client.kw}</strong></p>
        <p>Deuda: <strong>${client.debt}</strong></p>
        <p>Monto a Pagar: <strong>${client.total.toFixed(2)} $ ${discount !== 0 ? `<span class="discount">(-${discount}%)</span>` : ""}</strong></p>
        <button onclick="deleteClient('${client.dni}')" class="delete-client">Eliminar Cliente</button>
    `;

    clientsContainer.appendChild(divClient);
  });
}

// Función para buscar clientes por name o lastname
function searchClient() {
  const searchText = document.getElementById("searchClient").value.toLowerCase();

  const filterClients = clients.filter((client) => client.name.toLowerCase().includes(searchText) || client.lastname.toLowerCase().includes(searchText));

  showFilterclients(filterClients);
}

// Función para mostrar clientes filtrados
function showFilterclients(filterClients) {
  const clientsContainer = document.getElementById("clientsContainer");

  clientsContainer.innerHTML = "";

  filterClients.forEach((client) => {
    const divClient = document.createElement("div");

    let discount = 0;

    if (client.domicile === "Residencial" && client.kw > 2000 && client.kw <= 5000) {
      discount = 10;
    } else if (client.domicile === "Residencial" && client.kw > 5000) {
      discount = 15;
    } else if (client.domicile === "Comercial" && client.kw > 5000 && client.kw <= 7500) {
      discount = 10;
    } else if (client.domicile === "Comercial" && client.kw > 7000) {
      discount = 15;
    }

    divClient.innerHTML = `
        <p><strong>${client.name} ${client.lastname}</strong> - DNI: <strong>${client.dni}</strong></p>
        <p>Tipo de Domicilio: <strong>${client.domicile}</strong></p>
        <p>Consumo KW: <strong>${client.kw}</strong></p>
        <p>Deuda: <strong>${client.debt}</strong></p>
        <p>Monto a Pagar: <strong>${client.total.toFixed(2)} $ ${discount !== 0 ? `<span class="discount">(-${discount}%)</span>` : ""}</strong></p>
        <button onclick="deleteClient('${client.dni}')" class="delete-client">Eliminar Cliente</button>
    `;

    clientsContainer.appendChild(divClient);
  });
}

// Función para ordenar la lista de clientes alfabéticamente
function orderList() {
  clients.sort((a, b) => {
    const nameA = `${a.name} ${a.lastname}`.toLowerCase();
    const nameB = `${b.name} ${b.lastname}`.toLowerCase();

    return nameA.localeCompare(nameB);
  });

  showClients();
}

// Función para filtrar clientes deudores
function filterDebts() {
  const clientsDebts = clients.filter((client) => client.debt > 0);

  showFilterclients(clientsDebts);
}

// Función para eliminar un cliente
function deleteClient(dni) {
  const index = clients.findIndex((client) => client.dni === dni);

  if (index !== -1) {
    clients.splice(index, 1);

    showClients();
  }
}

// Función para limpiar el formulario después de agregar un cliente
function cleanForm() {
  document.getElementById("name").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("dni").value = "";
  document.getElementById("domicile").value = "Residencial";
  document.getElementById("kw").value = "";
  document.getElementById("debt").value = "";
}

// Mostrar la lista inicial de clientes al cargar la página
showClients();
