import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGetTask } from '../../interfaces/task.interface';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'task-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {

  @Input() task!: IGetTask;
  @Input() haveMove: boolean = false;
  @Output() deleteEmitter = new EventEmitter<void>();
  @Output() doneEmitter = new EventEmitter<void>();
  @Output() editEmitter = new EventEmitter<void>();
  @Output() moveEmitter = new EventEmitter<void>();

}
