import { addTodo } from "../../store/todos";
import { useState } from "react";
import { Todo } from "./todo";

export default function SmartInput() {
  const [value, setValue] = useState('');
  const createTodo = () => {
    if(value.trim()) {
      addTodo(new Todo(value));
      setValue('');
    }
  }
  return <div className="form">
    <input placeholder="Add task" type="text" value={value} onChange={event => setValue(event.target.value)}/>
    <button onClick={createTodo}>Добавить</button>
  </div>
}


