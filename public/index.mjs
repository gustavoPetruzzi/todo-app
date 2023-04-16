/**
 * 
 * @param {number} userId - user's id, it's going to be to used to retrieve user's todos 
 * @returns {Promise} - Todo's list by user
 */
const loadTodos = (userId) => {
  return fetch("/api/todos")
    .then(response => response.json());
}

export  {
  loadTodos
}