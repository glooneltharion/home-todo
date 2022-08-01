import { Todo } from 'src/app/types/Todo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { TodosService } from '../../services/todos/todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  faTimes = faTimesCircle;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {}

  delete(todo: Todo) {
    this.deleteTodo.emit(todo);
  }

  complete(todo: Todo) {
    todo.isDone = !todo.isDone;
    this.todosService.updateTodoIsDone(todo).subscribe();
  }
}
