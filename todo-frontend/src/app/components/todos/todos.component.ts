import { TodosService } from '../../services/todos/todos.service';
import { Component, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/types/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  @Output() todos!: Todo[];

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.todosService.getTodos().subscribe(todos => {
      this.todos = todos;
      console.log(this.todos);
      console.log(todos);
    });
  }

  deleteTodo(todo: Todo) {
    this.todosService
      .deleteTodo(todo)
      .subscribe(() => (this.todos = this.todos.filter(t => t.id !== todo.id)));
  }

  addTodo(todo: Todo) {
    this.todosService.addTodo(todo).subscribe(todo => this.todos.push(todo));
  }
}
