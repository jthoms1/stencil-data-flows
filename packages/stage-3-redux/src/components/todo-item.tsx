import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'todo-item',
})
export class TodoItem {

  @Prop() onClick: (e: MouseEvent) => void;
  @Prop() completed: Boolean;
  @Prop() text: string

  render() {
    return (
      <li
        onClick={this.onClick}
        style={{
          textDecoration: this.completed ? 'line-through' : 'none'
        }}
      >
        {this.text}
      </li>
    );
  }
}
