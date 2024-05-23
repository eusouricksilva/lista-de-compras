const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'telainicial.html'));
});

app.post('/api/cadastro', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    db.query('INSERT INTO usuarios (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', [firstName, lastName, email, password], (err, results) => {
        if (err) {
            console.error('Error creating user:', err);
            res.status(500).send('Server error');
            return;
        }
        res.sendStatus(200);
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            res.status(500).send('Server error');
            return;
        }

        if (results.length === 0) {
            res.status(401).send('Unauthorized');
            return;
        }

        res.sendStatus(200);
    });
});

// Rota para servir a página inicial após o login
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'telainicial.html'));
});

app.get('/api/lists', (req, res) => {
  db.query('SELECT * FROM lists', (err, results) => {
    if (err) {
      console.error('Error fetching lists:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

app.post('/api/lists', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO lists (name) VALUES (?)', [name], (err, results) => {
    if (err) {
      console.error('Error creating list:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json({ id: results.insertId, name });
  });
});

app.get('/api/lists/:id', (req, res) => {
  const listId = req.params.id;
  db.query('SELECT * FROM lists WHERE id = ?', [listId], (err, results) => {
    if (err) {
      console.error('Error fetching list:', err);
      res.status(500).send('Server error');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('List not found');
      return;
    }

    const list = results[0];
    db.query('SELECT * FROM items WHERE list_id = ?', [listId], (err, items) => {
      if (err) {
        console.error('Error fetching items:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json({ ...list, items });
    });
  });
});

app.post('/api/lists/:id/items', (req, res) => {
  const listId = req.params.id;
  const { item } = req.body;
  db.query('INSERT INTO items (list_id, item) VALUES (?, ?)', [listId, item], (err) => {
    if (err) {
      console.error('Error adding item:', err);
      res.status(500).send('Server error');
      return;
    }
    db.query('SELECT * FROM items WHERE list_id = ?', [listId], (err, items) => {
      if (err) {
        console.error('Error fetching items:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(items);
    });
  });
});

app.delete('/api/lists/:id/items/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  db.query('DELETE FROM items WHERE id = ?', [itemId], (err) => {
    if (err) {
      console.error('Error deleting item:', err);
      res.status(500).send('Server error');
      return;
    }
    res.sendStatus(204);
  });
});

app.delete('/api/lists/:id/items', (req, res) => {
  const listId = req.params.id;
  db.query('DELETE FROM items WHERE list_id = ?', [listId], (err) => {
    if (err) {
      console.error('Error clearing list:', err);
      res.status(500).send('Server error');
      return;
    }
    res.sendStatus(204);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
