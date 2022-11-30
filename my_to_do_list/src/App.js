import React from 'react'
import './App.css';

let numId = 0;

function App() {
  const [tasks, setTasks] = React.useState([
    {id:1,text:"Estudiar",done:false},
    {id:2,text:"Comer",done:false},
    {id:3,text:"Dormir",done:false}
  ])
  return (
    <div className="App">
      <h1>My ToDo List</h1>
      <ToDoList tasks={tasks} setTasks={setTasks}/>
      <AddToDoList tasks={tasks} setTasks={setTasks}/>
      <DeleteAll tasks={tasks} setTasks={setTasks}/>
    </div>
  );
}

function ToDoList({tasks, setTasks}) {
  function taskDone(toDo) {
    const done = tasks.map((clicked)=>clicked.id===toDo.id?{...clicked, done:!clicked.done}:clicked)((clicked)=>clicked.id===toDo.id?{...clicked, done:!clicked.done}:clicked)
    setTasks(done)
  }
  if (!tasks.length) {
    return <p>You don't have anything to do</p>
  }
  return(
    <ul>
      {tasks.map((toDo)=>
      <li
        onDoubleClick={()=>taskDone(toDo)}
        style={{textDecoration: toDo.done?"line-through":"none"}}
        key={toDo.id}>
        {toDo.text}
        <DeleteTask toDo={toDo} tasks={tasks} setTasks={setTasks}/>
        </li>
      )}
    </ul>
  )
}

function AddToDoList({tasks, setTasks}) {
  const taskRef = React.createRef();
  function addTask(e){
    e.preventDefault();
    if (taskRef.current.value !== "") {
      numId=tasks.length+1;
      setTasks(tasks.concat({id:numId,text:taskRef.current.value,done:false}))
      taskRef.current.value = "";
    }
  }
  return(
    <form>
      <input type="text" placeholder='Nueva tarea' ref={taskRef} />
      <button onClick={addTask}>Add</button>
    </form>
  )
}

function DeleteTask({toDo, tasks, setTasks}) {
  function taskDelete(toDo){
    const confirm = window.confirm("You will remove your task, are you sure?");
    if (confirm) {
      const remove = tasks.filter((t)=>t.id!==toDo.id);
      setTasks(remove);
    }
  }
  return(
    <span
      onClick={()=>taskDelete(toDo)}
      role="button"
      style={{
        color: "red",
        fontWeight: "bold",
        marginLeft: 10,
        cursor: "pointer"
      }}
    >
      x
    </span>
  )
}

function DeleteAll({tasks, setTasks}){
  function Delete() {
    const confirm = window.confirm("You will remove your task, are you sure?");
    if (confirm) {
      const erase = [];
      setTasks(erase);
    }
  }
  return(
    <button onClick={()=>Delete()} >Delete all</button>
  )
}

export default App;
