import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'src/app/types/Todo';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input() todos!: Todo[];

  constructor() {}

  ngOnInit(): void {}
}
