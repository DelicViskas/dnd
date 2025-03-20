export class Todo {
  private static currentId: number = 0;
  id: number;
  text: string;
  checked: boolean;

  constructor(text: string) {
    this.id = Todo.generateId();
    this.text = text; 
    this.checked = false;
  }

  private static generateId(): number {
    return ++Todo.currentId;
  }

  onChecked(): void {
    this.checked = !this.checked;
  }
}

