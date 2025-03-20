import { Todo } from './../src/components/todo';
import { atom } from 'nanostores'

const startTodos: Todo[] = [
  new Todo('подумать как сделать дз'),
  new Todo('сделать дз'),
  new Todo('протестить дз'),
]

export const $todos = atom<Todo[]>([...startTodos])

export function addTodo(todo: Todo) {
  $todos.set([...$todos.get(), todo])
}

export function checkedTodo(todo: Todo) {
  $todos.set($todos.get().map(t => {
    if(t === todo)
      t.onChecked();
    return t;
  }))
}

export function deleteTodo(id: number) {
  $todos.set($todos.get().filter(todo => todo.id !== id))
}

export function relocate(todo: Todo, index: number) {
  const todos = $todos.get();
  const filteredTodos = todos.filter(t => t.id !== todo.id);

  $todos.set([...filteredTodos.slice(0, index), todo, ...filteredTodos.slice(index)])
}