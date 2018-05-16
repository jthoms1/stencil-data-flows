import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'todo-footer',
})
export class TodoFooter {

  @Prop() onClick: Function;
  @Prop() completed: Boolean;
  @Prop() text: string

  render() {
    <div>
      <span>Show: </span>
      <FilterLink filter={VisibilityFilters.SHOW_ALL}>
        All
      </FilterLink>
      <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
        Active
      </FilterLink>
      <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
        Completed
      </FilterLink>
    </div>
  }
}
