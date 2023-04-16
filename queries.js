/**
 * @typedef User
 * @prop {number} id - user's id
 * @prop {string} name - user's name
 * @prop {string} email - user's email
 */

/**
 * @typedef Todo
 * @prop {number} id - todo's id
 * @prop {string} description - todo's description
 * @prop {boolean} active - true if todo is active
 * @prop {?number} userId - user's id
 */


const Pool = require('pg').Pool;

console.log("user", process.env.POSTGRES_USER);
console.log("db", process.env.POSTGRES_DB);

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	host: 'postgres',
	database: process.env.POSTGRES_DB,
	password: 'pass',
	port: '5432'
});

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<boolean>} return true if email and password exists
 */
const login = (email, password) => {
  return pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password])
    .then(results => {
      if (results.rows.length > 0) {
        const user = results.rows[0];
        return user.email === email ? true : false;
      }
      return false;
    })
}

/**
 * 
 * @param {number} userId - user's id 
 * @returns {Promise<Todo[]>} - a list with all todos 
 */
const getTodosByUser = (userId) => {
  return pool.query('SELECT id, description, active', [userId])
    .then(results => results.rows)
}

/**
 * 
 * @param {string} description - Description for new todo 
 * @param {number} userId - id of the todo's owner
 */
const addTodo = (description, userId) => {
  return pool.query('INSERT INTO todos (description, active, fk_user) VALUES ($1, true, $2)', [description, userId])
    .then(results => results.rows[0].id)
}

/**
 * 
 * @param {number} todoId - todo's id 
 * @param {string} description  - description that's going to be updated
 * @returns {Promise<Todo[]>} - A promise of the todos affected
 */
const updateTodo = (todoId, description) => {
  return pool.query('UPDATE todos SET description = $1 WHERE id = $2', [description, todoIn])
    .then(results => results.rows);
}

/**
 * 
 * @param {number} todoId - todo's id
 * @param {boolean} isActive  - new status for todo
 * @returns {Promise<Todo[]>} = A promise of the todos affected
 */
const toogleTodo = (todoId, isActive) => {
  return pool.query('UPDATE todos SET active = $1 WHERE id = $2', [isActive, todoId])
    .then(results => results.rows);
}

module.exports = {
  getTodosByUser,
  addTodo,
  updateTodo,
  toogleTodo
}


