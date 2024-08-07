// script.js

// Banco de dados
let db = [];

// Função para adicionar um novo item ao banco de dados
function addItem(desc, amount, type) {
  db.push({ desc, amount, type });
  updateTable();
}

// Função para atualizar a tabela com os dados do banco de dados
function updateTable() {
  const tableBody = document.querySelector('tbody');
  tableBody.innerHTML = '';
  db.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.desc}</td>
      <td class="columnAmount">${item.amount}</td>
      <td class="columnType">${item.type}</td>
      <td class="columnAction">
        <button onclick="deleteItem(${db.indexOf(item)})">
          <i class="bx-trash"></i>
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
  updateResume();
}

// Função para atualizar o resumo com os dados do banco de dados
function updateResume() {
  const incomes = db.filter((item) => item.type === 'Entrada').reduce((acc, item) => acc + item.amount, 0);
  const expenses = db.filter((item) => item.type === 'Saída').reduce((acc, item) => acc + item.amount, 0);
  const total = incomes - expenses;

  document.querySelector('.incomes').textContent = `R$ ${incomes.toFixed(2)}`;
  document.querySelector('.expenses').textContent = `R$ ${expenses.toFixed(2)}`;
  document.querySelector('.total').textContent = `R$ ${total.toFixed(2)}`;
}

// Função para deletar um item do banco de dados
function deleteItem(index) {
  db.splice(index, 1);
  updateTable();
}

// Função para limpar o banco de dados
function clearDB() {
    db = [];
    updateTable();
  }
  
  // Função para limpar o banco de dados com senha
  function clearDBWithPassword() {
    const password = prompt('Digite a senha para limpar o banco de dados:');
    if (password === 'Hellan77') {
      if (confirm('Você tem certeza que deseja limpar o banco de dados?')) {
        clearDB();
      }
    } else {
      alert('Senha incorreta!');
      return; // Adicionei essa linha para parar a execução da função aqui
    }
  }

// Adicionar evento de click ao botão de incluir
document.getElementById('btnNew').addEventListener('click', () => {
  const desc = document.getElementById('desc').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;
  addItem(desc, amount, type);
  document.getElementById('desc').value = '';
  document.getElementById('amount').value = '';
});

// Adicionar evento de click ao botão de limpar
document.getElementById('btnClear').addEventListener('click', clearDBWithPassword);