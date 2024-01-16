import { Component } from '@angular/core';
import { TaskCardComponent } from '../../shared/components/task-card/task-card.component';
import { ListService } from '../../shared/services/list.service';
import { IGetList } from '../../shared/interfaces/list.interface';
import { TaskService } from '../../shared/services/task.service';
import { IGetTask } from '../../shared/interfaces/task.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateTaskDialogComponent } from '../../shared/components/update-task-dialog/update-task-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-daily-tasks',
  standalone: true,
  imports: [TaskCardComponent, MatButtonModule, MatIconModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule],
  templateUrl: './daily-tasks.component.html',
  styleUrl: './daily-tasks.component.scss'
})
export class DailyTasksComponent {

  mainList!: IGetList;
  dilyTasks: IGetTask[] = [];


  constructor(
    private listService: ListService,
    private taskService: TaskService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getMainList();
  }

  getMainList() {
    this.listService.getMainList().subscribe(res => {
      this.mainList = res;
      this.getDailyTasks(this.mainList._id);
    })
  }


  getDailyTasks(listId: string) {
    this.taskService.getTasksByListId(listId).subscribe(res => {
      this.dilyTasks = res;
    })
  }


  addNewTask() {

    const dialogRef = this.dialog.open(UpdateTaskDialogComponent,
      {
        width: '500px',
        maxHeight: '670px',
        maxWidth: '100%',
        data: {
          listid: this.mainList._id
        }
      }
    );

    dialogRef.afterClosed().subscribe((task: IGetTask) => {
      if (task)
        this.dilyTasks.push(task);
    })
  }

  editTask(task: IGetTask) {
    const dialogRef = this.dialog.open(UpdateTaskDialogComponent,
      {
        width: '500px',
        maxHeight: '670px',
        maxWidth: '100%',
        data: {
          listid: this.mainList._id,
          task: task
        }
      }
    );

    dialogRef.afterClosed().subscribe((newTask: IGetTask) => {
      if (newTask) {
        let updatedTask = this.dilyTasks.find(tsk => tsk._id == task._id);
        updatedTask!.date = newTask.date;
        updatedTask!.title = newTask.title;
        updatedTask!.description = newTask.description;
      }
    })
  }

  deleteTask(taskId: string, index: number) {
    this.taskService.deleteTask(taskId).subscribe(res => {
      this.dilyTasks.splice(index, 1);
    })
  }

  doneTask(task: IGetTask) {
    task.done = true;
    this.taskService.updateTask(task._id, task).subscribe();
  }


}
