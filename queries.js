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
  return pool.query('SELECT id, description, active WHERE userId = $1', [userId])
    .then(results => results.rows)
}

/**
 * 
 * @param {string} description - Description for new todo 
 * @param {number} userId - id of the todo's owner
 */
const addTodo = (description, userId) => {
  return pool.query('INSERT INTO todos (description, active, userId) VALUES ($1, true, $2)', [description, userId])
    .then(results => results.rows[0].id)
}

