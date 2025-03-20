import { useStore } from '@nanostores/react'
import List from "./List"
import SmartInput from "./SmartInput"
import { $todos } from '../../store/todos'

export default function TodoList() {
  const todos = useStore($todos);

  return <>
    <SmartInput />
    {!!todos.length && <List todos={todos}/>}
  </>
}