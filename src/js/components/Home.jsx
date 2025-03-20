import React, { useState, useEffect } from 'react';

export const Home = () => {
  const [todos, setTodos] = useState([]);
  const [tareaInput, setTareaInput] = useState('');
  const API_URL = 'https://playground.4geeks.com/todo/users/wins444';

  // Cargar tareas desde la API al inicio
  useEffect(() => {
    const fetchTareas = async () => {
        try{
            const response = await fetch(`https://playground.4geeks.com/todo/users/wins444`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
            const data = await response.json();
            setTodos(data.todos);
        }catch (error){
        console.error("Hubo un problema con la solicitud:", error);
        }
  };
  fetchTareas()
  }, []);

  const agregarTarea = async () => {
    
  }

  // Eliminar una tarea
  const eliminarTarea = async (idTarea) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/wins444/${idTarea}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error HTTP! Estado: ${response.status}`);
      }
      const nuevaLista = todos.filter(tarea => tarea.id !== idTarea);
    actualizarTareas(nuevaLista);
    } catch (error) {
      console.error("Hubo un problema al eliminar la tarea:", error.message);
    }
  };


  // Marcar tarea como completada
  const alternarCompletada = (idTarea) => {
    const nuevaLista = todos.map(tarea =>
      tarea.id === idTarea ? { ...tarea, done: !tarea.done } : tarea
    );
    actualizarTareas(nuevaLista);
  };

  // Limpiar todas las tareas
  const limpiarTareas = () => {
    actualizarTareas([]);
  };

  // Actualizar lista en la API
  const actualizarTareas = (nuevaLista) => {
    fetch(API_URL, {
      method: 'PUT',
      body: JSON.stringify(nuevaLista),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(resp => resp.json())
      .then(() => {
        console.log("Tareas actualizadas en la API:", nuevaLista);
        setTodos(nuevaLista);
      })
      .catch(error => console.error('Error actualizando tareas:', error));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>tareas</h1>
        <form onSubmit={agregarTarea}>
          <input
            autoFocus
            className="new-todo"
            placeholder="¿Qué necesitas hacer?"
            value={tareaInput}
            onChange={(e) => setTareaInput(e.target.value)}
          />
        </form>
      </header>
      <section className="main">
        <ul className="todo-list">
          {todos.length > 0 ? (
            todos.map((tarea) => (
              <li key={tarea.id} className={tarea.done ? 'completed' : ''}>
                <div className="view">
                  <input
                    type="checkbox"
                    checked={tarea.done}
                    onChange={() => alternarCompletada(tarea.id)}
                  />
                  <label>{tarea.label}</label>
                  <button className="destroy" onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
                </div>
              </li>
            ))
          ) : (
            <p>No hay tareas disponibles.</p>
          )}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{todos.filter(tarea => !tarea.done).length}</strong> tarea(s) pendiente(s)
        </span>
        <button onClick={limpiarTareas} className="clear-completed">Limpiar todas</button>
      </footer>
    </section>
  );
};

export default Home;

