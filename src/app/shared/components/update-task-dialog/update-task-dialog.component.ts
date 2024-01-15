import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IGetTask } from '../../interfaces/task.interface';

@Component({
  selector: 'app-update-task-dialog',
  standalone: true,
  imports: [ MatFormFieldModule, ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './update-task-dialog.component.html',
  styleUrl: './update-task-dialog.component.scss'
})
export class UpdateTaskDialogComponent {

  taskForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)  public dialogData: {listid: string, task: IGetTask},
    public dialogRef: MatDialogRef<UpdateTaskDialogComponent>,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.taskForm = this.formBuilder.group({
      title: [this.dialogData.task?.title || '', Validators.required],
      description: [this.dialogData.task?.description || '', Validators.required],
      date: [this.dialogData.task?.date || null, Validators.required],
      done: [this.dialogData.task?.done || 'false', Validators.required],
      list: [this.dialogData.listid, Validators.required],
    })
  }

  submit() {

    if (this.dialogData?.task) {
      this.taskService.updateTask(this.dialogData.task._id, this.taskForm.value).subscribe(res => {
        this._snackBar.open('the task is updated', 'ok');
        this.dialogRef.close(this.taskForm.value);
      })
    }
    else {
      this.taskService.createTask(this.taskForm.value).subscribe(res => {
        this._snackBar.open('the task is added', 'ok');
        this.dialogRef.close(res);
      })
    }
  }


}
