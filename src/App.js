import logo from './logo.svg';
import './App.css';
import React from 'react';
import {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [todos,setTodos] = React.useState([]);
  const [todo,setTodo] = React.useState("");
  const [todoEditing,setTodoEditing] =React.useState(null);
  const [editingText,setEditingText] = React.useState("");

  function handleSubmit(e){
    e.preventDefault();

    const newTodo = {
      id : new Date().getTime(),
      text : todo,
    }
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id){
    const updatedTodo = [...todos].filter((todo)=>todo.id !== id);
    setTodos(updatedTodo);

  }
 
  function editTodo(id){
    const updatedTodos = [...todos].map((todo) =>{
      if (todo.id===id){
        todo.text = editingText;
      }
      return todo;
    })
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text"  value={todo} onChange={(e)=> setTodo(e.target.value)} />
        <button type='submit'>+</button>
      </form>
      {todos.map((todo)=> <div key={todo.id}>
        {todoEditing===todo.id? 
        (<input 
          type="text" 
          onChange={(e)=>setEditingText(e.target.value)} 
          value={editingText} />):(
          <div>{todo.text}</div>
          )}
        
        
        <button onClick={()=> deleteTodo(todo.id)}>Delete</button>
        {todoEditing ===todo.id ? 
         (<button onClick={()=> editTodo(todo.id)}>Submit Edits</button>):
        (<button onClick={()=> setTodoEditing(todo.id)}>Edit Todo</button>)
       }
        
        
        </div>)}
    </div>
    
  );
}



export default App;
