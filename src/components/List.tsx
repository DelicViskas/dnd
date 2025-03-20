
import { checkedTodo, deleteTodo, relocate } from "../../store/todos";
import { Todo } from "./todo"
import { useState } from "react";

export default function List({ todos }: { todos: Todo[] }) {
  const [to, setTo] = useState<number | null>(null);
  const [topOrBot, setTopOrBot] = useState<string>('');
  const [draggingTodo, setDraggingTodo] = useState<Todo | null>(null);

  return <fieldset
    onDragOver={event => {
      event.preventDefault();
      const targetId = (event.target as Element).closest('li')?.dataset.id;
      if (!targetId || !draggingTodo) return;
      const draggedIndex = todos.findIndex((t) => t.id === draggingTodo.id);
      const targetIndex = todos.findIndex((t) => t.id === Number(targetId));
      if (draggedIndex > targetIndex)
        setTopOrBot("top");
      else
        setTopOrBot("bottom");
      setTo(Number(targetId));
    }}
    onDrop={event => {
      const id = (event.target as Element).closest('li')?.dataset.id;
      if (!id || !draggingTodo) return;

      const index = todos.findIndex(t => t.id === Number(id));
      relocate(draggingTodo, index);
      setTo(null)
      setTopOrBot('');
      setDraggingTodo(null);
    }}>
    <legend>Todo List</legend>
    <ol>
      {todos.map(todo => {
        return <li className={to === todo.id ? topOrBot : ""} key={todo.id} data-id={todo.id} onDragStart={() => setDraggingTodo(todo)} draggable="true">
          <input type="checkbox" checked={todo.checked} onChange={() => checkedTodo(todo)} />
          <span className={todo.checked ? "completed" : ""}>{todo.text}</span>
          <button className="nobg" onClick={() => deleteTodo(todo.id)}>❌</button>
        </li>
      })}
    </ol>
  </fieldset>
}