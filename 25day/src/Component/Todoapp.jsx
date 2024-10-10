import React, { useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editTaskName, setEditTaskName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      taskName: taskName,
      description: description,
      status: 'not completed',
    };
    setTodos([...todos, newTodo]);
    setTaskName('');
    setDescription('');
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id === id));
  }; 
  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setIsEditing(id);
    setEditTaskName(todoToEdit.taskName);
    setEditDescription(todoToEdit.description);
  };
  const saveTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, taskName: editTaskName, description: editDescription }
        : todo
    );
    setTodos(updatedTodos);
    setIsEditing(null);
  };
  const updateStatus = (id, status) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: status } : todo
    );
    setTodos(updatedTodos);
  };
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.status === 'completed';
    if (filter === 'not completed') return todo.status === 'not completed';
    return true; 
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center">Todo Task App</h2>
      <div className="mb-3">
        <input
          type="text"className="form-control mb-2"placeholder="Task Name"value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
        <textarea className="form-control mb-2" placeholder="Description" value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className="btn btn-primary" onClick={addTodo}>
          Add Todo
        </button>
      </div>
      <div className="mb-3">
        <label htmlFor="filter">Filter by Status: </label>
        <select
          id="filter"
          className="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not completed">Not Completed</option>
        </select>
      </div>
      <div className="row">
        {filteredTodos.map((todo) => (
          <div className="col-md-4" key={todo.id}>
            <div className="card mb-3">
              <div className="card-body">
                {isEditing === todo.id ? (
                  <>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={editTaskName}
                      onChange={(e) => setEditTaskName(e.target.value)}
                    />
                    <textarea
                      className="form-control mb-2"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    ></textarea>
                    <button
                      className="btn btn-success"
                      onClick={() => saveTodo(todo.id)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h5>{todo.taskName}</h5>
                    <p>{todo.description}</p>
                    <p>
                      Status:{' '}
                      <button
                        className="dropdown"
                        onClick={() =>
                          updateStatus(
                            todo.id,
                            todo.status === 'completed'
                              ? 'not completed'
                              : 'completed'
                          )
                        }
                      >
                        {todo.status}
                      </button>
                    </p>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => editTodo(todo.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
