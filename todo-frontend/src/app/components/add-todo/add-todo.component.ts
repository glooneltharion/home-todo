import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Todo } from 'src/app/types/Todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  @Output() addTodo: EventEmitter<Todo> = new EventEmitter();
  @Input() todos!: Todo[];
  text!: string;
  isDone: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.text) {
      alert('Please add a task!');
      return;
    }

    const newTodo: Todo = {
      text: this.text,
      isDone: this.isDone,
    };

    this.todos.push(newTodo);
    console.log(this.todos);

    this.addTodo.emit(newTodo);

    this.text = '';
    this.isDone = false;
  }
}
