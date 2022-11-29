import React from 'react'
import './App.css';

function App() {
  const tasks = [
    {id:1,text:"Estudiar",done:false},
    {id:2,text:"Comer",done:false},
    {id:3,text:"Dormir",done:false}
  ]
  return (
    <div className="App">
      <ToDoList tasks={tasks}/>
    </div>
  );
}

function ToDoList(tasks) {
  return(
    <ul>
      {tasks.map((toDo)=>
      <li key={toDo.id}>{toDo.text}</li>
      )}
    </ul>
  )
}

export default App;
