import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Todo } from 'src/app/types/Todo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private url = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url);
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.url}/${todo.id}`;
    return this.http.delete<Todo>(url);
  }

  updateTodoIsDone(todo: Todo): Observable<Todo> {
    const url = `${this.url}/${todo.id}`;
    return this.http.put<Todo>(url, todo, httpOptions);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.url, todo, httpOptions);
  }
}
