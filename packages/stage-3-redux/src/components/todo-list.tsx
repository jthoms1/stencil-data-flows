import { Component, Prop } from '@stencil/core';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

@Component({
  tag: 'todo-list',
})
export class TodoList {
  @Prop() todos: Todo[] = [];
  @Prop() toggleTodo: (id: string) => void;

  render() {
    return (
      <ul>
        {this.todos.map(todo =>
          <todo-item
            key={todo.id}
            {...todo}
            onClick={() => this.toggleTodo(todo.id)}
          />
        )}
      </ul>
    );
  }
}
