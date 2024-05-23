const mysql = require('mysql2');

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rick207195',
  database: 'derelist_database'
});

// Conexão com o banco de dados
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Exportando a conexão com o banco de dados para ser utilizada em outros arquivos
module.exports = db;
