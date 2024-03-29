import { Component } from '@angular/core';
import { ListService } from '../../shared/services/list.service';
import { IGetList } from '../../shared/interfaces/list.interface';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UpdateListDialogComponent } from '../../shared/components/update-list-dialog/update-list-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule, MatTooltipModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, RouterLink],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent {

  displayedColumns: string[] = ['title', 'date', 'action'];
  lists: IGetList[] = [];


  constructor(
    private listService: ListService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllLists();
  }

  getAllLists() {
    this.listService.getAllLists().subscribe(res => {
      this.lists = res;
    })
  }

  addNewList() {
    const dialogRef = this.dialog.open(UpdateListDialogComponent,
      {
        width: '500px',
        maxHeight: '670px',
        maxWidth: '100%',
      }
    );

    dialogRef.afterClosed().subscribe((list: IGetList) => {
      if (list) {
        this.lists.push(list);
        this.lists = [...this.lists];
      }
    })

  }
  
  removeList(listId: string) {
    this.listService.deleteList(listId).subscribe(res => {
      const i = this.lists.findIndex(list => list._id == listId);
      this.lists.splice(i, 1);
      this.lists = [...this.lists];
      this._snackBar.open('list removed', 'ok')
    })
  }
}
