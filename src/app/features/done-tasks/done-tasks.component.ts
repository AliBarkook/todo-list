import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTaskDialogComponent } from '../../shared/components/update-task-dialog/update-task-dialog.component';
import { IGetTask } from '../../shared/interfaces/task.interface';
import { ListService } from '../../shared/services/list.service';
import { TaskService } from '../../shared/services/task.service';
import { TaskCardComponent } from '../../shared/components/task-card/task-card.component';

@Component({
  selector: 'app-done-tasks',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './done-tasks.component.html',
  styleUrl: './done-tasks.component.scss'
})
export class DoneTasksComponent {


  doneTasks: IGetTask[] = [];


  constructor(
    private listService: ListService,
    private taskService: TaskService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getDoneTasks();
  }


  getDoneTasks() {
    this.taskService.getDoneTasks().subscribe(res => {
      this.doneTasks = res;
    })
  }


  editTask(task: IGetTask) {
    const dialogRef = this.dialog.open(UpdateTaskDialogComponent,
      {
        width: '500px',
        maxHeight: '670px',
        maxWidth: '100%',
        data: {
          listid: task.list,
          task: task
        }
      }
    );

    dialogRef.afterClosed().subscribe((newTask: IGetTask) => {
      if (newTask) {
        let updatedTask = this.doneTasks.find(tsk => tsk._id == task._id);
        updatedTask!.date = newTask.date;
        updatedTask!.title = newTask.title;
        updatedTask!.description = newTask.description;
      }
    })
  }

  deleteTask(taskId: string, index: number) {
    this.taskService.deleteTask(taskId).subscribe(res => {
      this.doneTasks.splice(index, 1);
    })
  }

  doneTask(task: IGetTask) {
    task.done = true;
    this.taskService.updateTask(task._id, task).subscribe();
  }
}
