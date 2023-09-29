import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IWorkingTime } from '../working-time.type';
import { WorkingTimeProvider } from '../working-time.provider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdateWorkingTimeDto } from '../dto/update-working-time.dto';

@Component({
  selector: 'working-time-dialog',
  templateUrl: './working-time-dialog.component.html',
  standalone: true,
  imports: [
    MatRadioModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  styleUrls: ['./working-time-dialog.component.scss']
})
export class WorkingTimeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<IWorkingTime>,
    @Inject(MAT_DIALOG_DATA) public data: IWorkingTime,
    public readonly workingTimeService: WorkingTimeProvider,
    private snackBar: MatSnackBar,
  ) { }

  submit() {
    this.workingTimeService.editWorkingTime(this.data.id, new UpdateWorkingTimeDto(this.data)).subscribe({
      next: () => this.snackBar.open('Done!', 'X', {
        verticalPosition: 'top',
        duration: 1000
      }),
      error: (error) => {
        console.error('Working Time Edit Error', error);

        this.snackBar.open((error as HttpErrorResponse)?.error?.message || (error as HttpErrorResponse)?.statusText || 'something wrong', 'X', {
          verticalPosition: 'top'
        });
      }
    });

    this.dialogRef.close();
  }
}
