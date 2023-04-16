
const express = require('express');
const dotenv = require('dotenv');


const app = express();
dotenv.config();


const PORT = process.env.PORT || 3000;
const db = require('./queries');
console.log(process.env)
console.log('DATABASE_URL',process.env.DATABASE_URL);
console.log('NODE_ENV',process.env.NODE_ENV);
console.log('PORT', process.env.PORT);
console.log('POSTGRES_USER',process.env.POSTGRES_USER);
console.log('POSTGRES_PASSWORD', process.env.POSTGRES_PASSWORD);
console.log('POSTGRES_DB', process.env.POSTGRES_DB);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));


app.get('/api/todos', async (req, res) => {
  try {
    // Hardcoded until I add a login
    const { todos } = await db.getTodosByUser(1);
    return res.status(200).send(JSON.stringify(users));
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: error.message
    });
  }
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
});