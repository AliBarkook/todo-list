import { Component, Inject } from '@angular/core';
import { ListService } from '../../services/list.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-list-dialog',
  standalone: true,
  imports: [ MatFormFieldModule, ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './update-list-dialog.component.html',
  styleUrl: './update-list-dialog.component.scss'
})
export class UpdateListDialogComponent {

  listForm!: FormGroup;
  
  constructor(
    @Inject(MAT_DIALOG_DATA)  public dialogData: {},
    public dialogRef: MatDialogRef<UpdateListDialogComponent>,
    private formBuilder: FormBuilder,
    private listService: ListService,
    private _snackBar: MatSnackBar
  ) {}


  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.listForm = this.formBuilder.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      isMain: [false, Validators.required],
    })
  }


  submit() {
    this.listService.createList(this.listForm.value).subscribe(res => {
      this._snackBar.open('new list is added', 'ok');
      this.dialogRef.close(res);
    })
  }
}
