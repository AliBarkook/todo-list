import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaskCardComponent } from '../../../../shared/components/task-card/task-card.component';
import { UpdateTaskDialogComponent } from '../../../../shared/components/update-task-dialog/update-task-dialog.component';
import { IGetList } from '../../../../shared/interfaces/list.interface';
import { IGetTask } from '../../../../shared/interfaces/task.interface';
import { ListService } from '../../../../shared/services/list.service';
import { TaskService } from '../../../../shared/services/task.service';
import { ActivatedRoute } from '@angular/router';
import { UpdateListDialogComponent } from '../../../../shared/components/update-list-dialog/update-list-dialog.component';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-detail',
  standalone: true,
  imports: [TaskCardComponent, MatButtonModule, MatIconModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, CommonModule],
  templateUrl: './list-detail.component.html',
  styleUrl: './list-detail.component.scss'
})
export class ListDetailComponent {

  
  listDetail!: IGetList;
  listTasks: IGetTask[] = [];


  constructor(
    private listService: ListService,
    private taskService: TaskService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getListDetail(params['id']);
    })
  }

  getListDetail(listId: string) {
    this.listService.getlistById(listId).subscribe(res => {
      this.listDetail = res;
      this.getDailyTasks(this.listDetail._id);
    })
  }


  getDailyTasks(listId: string) {
    this.taskService.getTasksByListId(listId).subscribe(res => {
      this.listTasks = res;
    })
  }


  addNewTask() {

    const dialogRef = this.dialog.open(UpdateTaskDialogComponent,
      {
        width: '500px',
        maxHeight: '670px',
        maxWidth: '100%',
        data: {
          listid: this.listDetail._id
        }
      }
    );

    dialogRef.afterClosed().subscribe((task: IGetTask) => {
      if (task)
        this.listTasks.push(task);
    })
  }

  editTask(task: IGetTask) {
    const dialogRef = this.dialog.open(UpdateTaskDialogComponent,
      {
        width: '500px',
        maxHeight: '670px',
        maxWidth: '100%',
        data: {
          listid: this.listDetail._id,
          task: task
        }
      }
    );

    dialogRef.afterClosed().subscribe((newTask: IGetTask) => {
      if (newTask) {
        let updatedTask = this.listTasks.find(tsk => tsk._id == task._id);
        updatedTask!.date = newTask.date;
        updatedTask!.title = newTask.title;
        updatedTask!.description = newTask.description;
      }
    })
  }

  deleteTask(taskId: string, index: number) {
    this.taskService.deleteTask(taskId).subscribe(res => {
      this.listTasks.splice(index, 1);
    })
  }

  doneTask(task: IGetTask) {
    task.done = true;
    this.taskService.updateTask(task._id, task).subscribe();
  }


  editList() {
    const dialogRef = this.dialog.open(UpdateListDialogComponent,
      {
        width: '500px',
        maxHeight: '670px',
        maxWidth: '100%',
        data: {
          list: this.listDetail
        }
      }
    );

    dialogRef.afterClosed().subscribe((list: IGetList) => {
      if (list) {
        this.listDetail.date = list.date;
        this.listDetail.title = list.title;
      }
    })
  }

  moveToMainList(task: IGetTask, index: number) {
    this.listService.getMainList().pipe(
      switchMap(res => {
        task.list = res._id;
        return this.taskService.updateTask(task._id, task);
      })
    ).subscribe(res => {
      this._snackBar.open('task moved to main list', 'ok')
      if (task.list != this.listDetail._id) {
        this.listTasks.splice(index, 1);
      }
    })
  }

}
