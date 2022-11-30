import React from 'react'
import './App.css';

let numId = 0;
const taskRef = React.createRef();

function App() {
  const [tasks, setTasks] = React.useState([
    {id:1,text:"Estudiar",done:false, select:false},
    {id:2,text:"Comer",done:false, select:false},
    {id:3,text:"Dormir",done:false, select:false}
  ])
  return (
    <div className="App">
      <h1>My ToDo List</h1>
      <AddToDoList tasks={tasks} setTasks={setTasks}/>
      <ToDoList tasks={tasks} setTasks={setTasks}/>
      <Menu tasks={tasks} setTasks={setTasks}/>
    </div>
  );
}

function ToDoList({tasks, setTasks}) {
  function taskDone(toDo) {
    const done = tasks.map((clicked)=>clicked.id===toDo.id?{...clicked, done:!clicked.done}:clicked)((clicked)=>clicked.id===toDo.id?{...clicked, done:!clicked.done}:clicked)
    setTasks(done)
  }
  function checked(elem) {
    elem.select = !elem.select
    console.log(elem);
  }
  if (!tasks.length) {
    return <p>You don't have anything to do</p>
  }
  return(
    <div>
      {tasks.map((toDo)=>
      <section className='task' key={`section${toDo.id}`}>
        <article key={`article${toDo.id}`}>
          <input
            onChange={()=>checked(toDo)}
            type="checkbox"
            onDoubleClick={()=>taskDone(toDo)}
            style={{textDecoration: toDo.done?"line-through":"none"}}
            key={toDo.id} />
            <p key={`text${toDo.id}`}>{toDo.text}</p>
            <div key={`borrar${toDo.id}`}>
              {/* <DeleteTask toDo={toDo} tasks={tasks} setTasks={setTasks}/> */}
            </div>  
        </article>
        <div className='separador' key={`separador${toDo.id}`}></div>
      </section>
    )}
    </div>
  )
}

function AddToDoList({tasks, setTasks}) {
  function addTask(e){
    e.preventDefault();
    if (taskRef.current.value !== "") {
      numId=tasks.length+1;
      setTasks(tasks.concat({id:numId,text:taskRef.current.value,done:false}))
      taskRef.current.value = "";
    }
  }
  return(
    <form onSubmit={addTask}>
      <input type="text" placeholder='Nueva tarea' ref={taskRef} />
    </form>
  )
}

// function DeleteTask({toDo, tasks, setTasks}) {
//   function taskDelete(toDo){
//     const confirm = window.confirm("You will remove your task, are you sure?");
//     if (confirm) {
//       const remove = tasks.filter((t)=>t.id!==toDo.id);
//       setTasks(remove);
//     }
//   }
//   return(
//     <span
//     onClick={()=>taskDelete(toDo)}
//       role="button"
//       style={{
//         color: "red",
//         fontWeight: "bold",
//         marginLeft: 10,
//         cursor: "pointer"
//       }}
//       >
//       x
//     </span>
//   )
// }

function Menu({tasks, setTasks}){
  function addTask(){
    if (taskRef.current.value !== "") {
      numId=tasks.length+1;
      setTasks(tasks.concat({id:numId,text:taskRef.current.value,done:false}))
      taskRef.current.value = "";
    }
  }
  function Delete() {
        const confirm = window.confirm(`You will remove the task`);
        if (confirm) {
          const remove = tasks.filter((t)=>t.select===false);
          setTasks(remove);
        }
  }
  return(
    <div id='menu'>
      <div>
        <button onClick={()=>addTask()} className="btn">+</button>
        <button onClick={()=>Delete()} className="btn">Del</button>
        <div className='separadorV'></div>
        <p>{tasks.length} {tasks.length === 1?"item":"items"} left</p>
      </div>
      <div>
        <button className="btn">All</button>
        <button className="btn">Active</button>
        <button className="btn">Completed</button>
      </div>
    </div>
  )
}

export default App;
