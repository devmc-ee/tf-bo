import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MenuGroupDialogData } from '../menu.type';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MenuProvider } from '../menu.provider';
import { DIALOG_MODE } from 'src/app/app.type';
import { firstValueFrom } from 'rxjs';
import { MenuGroupDto } from '../dto/menu-group.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'menu-group-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule,],
  templateUrl: './menu-group-dialog.component.html',
  styleUrls: ['./menu-group-dialog.component.scss'],
  providers: [MenuProvider],
})
export class MenuGroupDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MenuGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MenuGroupDialogData,
    public readonly menuGroupService: MenuProvider,
    private snackBar: MatSnackBar,
  ) { }

  submit() {
    if (this.data.mode === DIALOG_MODE.NEW) {
      this.menuGroupService.createGroup(new MenuGroupDto(this.data)).subscribe({
        next: () => this.snackBar.open('Done!', 'X', {
          verticalPosition: 'top',
          duration: 1000
        }),
        error: (error) => {
          console.log('ADD GROUP ERROR', error);
          this.snackBar.open((error as HttpErrorResponse)?.error?.message || (error as HttpErrorResponse)?.statusText || 'something wrong', 'X', {
            verticalPosition: 'top'
          });
        }
      });
    } else {
      this.menuGroupService.editGroup(this.data.id, new MenuGroupDto(this.data)).subscribe({
        next: () => this.snackBar.open('Done!', 'X', {
          verticalPosition: 'top',
          duration: 1000
        }),
        error: (error) => {
          console.log('EDIT GROUP ERROR', error);
          this.snackBar.open((error as HttpErrorResponse)?.error?.message || (error as HttpErrorResponse)?.statusText || 'something wrong', 'X', {
            verticalPosition: 'top'
          });
        }
      });
    }

    this.dialogRef.close();
  }
}
