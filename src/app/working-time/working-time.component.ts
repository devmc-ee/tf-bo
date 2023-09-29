import { Component, OnInit } from '@angular/core';
import { WorkingTimeProvider } from './working-time.provider';
import { IWorkingTime } from './working-time.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { WorkingTimeDialogComponent } from './working-time-dialog/working-time-dialog.component';

@Component({
  selector: 'app-working-time',
  templateUrl: './working-time.component.html',
  styleUrls: ['./working-time.component.scss']
})
export class WorkingTimeComponent implements OnInit {
  workingTimes: IWorkingTime[] = []
  constructor(
    public workingTimeService: WorkingTimeProvider,
    private snackBar: MatSnackBar,
    private readonly dialog: MatDialog,

  ){}
  ngOnInit(): void {
    this.updateData();
  }

  updateData() {
    this.workingTimeService.getWorkingTimes().subscribe({
      next: (data) => this.workingTimes = data,
      error: (error) => this.snackBar.open((error as HttpErrorResponse)?.error?.message || (error as HttpErrorResponse)?.statusText || 'something wrong', 'X', {
        verticalPosition: 'top'
      }),
    })
  }
  
  edit(id: string) {
    const workingTime = this.workingTimes.find(({ id: _id }) => _id === id);

    const dialogRef = this.dialog.open(
      WorkingTimeDialogComponent, {
        data: workingTime
      }
    )

    dialogRef.afterClosed().subscribe({
      next: () => this.updateData(),
      error: (error) => {
        console.log(error)
      } 
    })
  }
}
