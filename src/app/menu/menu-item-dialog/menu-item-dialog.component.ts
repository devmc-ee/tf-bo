import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DIALOG_MODE } from 'src/app/app.type';
import { firstValueFrom } from 'rxjs';
import { MenuProvider } from '../menu.provider';
import { MenuItemDto } from '../dto/menu-item.dto';
import { MenuItemDialogData } from '../menu.type';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'menu-item-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, MatAutocompleteModule, NgFor, MatSelectModule],
  templateUrl: './menu-item-dialog.component.html',
  styleUrls: ['./menu-item-dialog.component.scss'],
  providers: [MenuProvider],
})
export class MenuItemDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MenuItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MenuItemDialogData,
    public readonly menuService: MenuProvider,
    private snackBar: MatSnackBar,
  ) { }

  submit() {
    if (this.data.mode === DIALOG_MODE.NEW) {
      this.menuService.createItem(new MenuItemDto(this.data)).subscribe({
        next: () => this.snackBar.open('Done!', 'X', {
          verticalPosition: 'top',
          duration: 1000
        }),
        error: (error) => {
          console.log('ADD ITEM ERROR', error);
          this.snackBar.open((error as HttpErrorResponse)?.error?.message || (error as HttpErrorResponse)?.statusText || 'something wrong', 'X', {
            verticalPosition: 'top',
            duration: 4000
          });
        }
      });
    } else {
      this.menuService.editItem(this.data.id, new MenuItemDto(this.data)).subscribe({
        next: () => this.snackBar.open('Done!', 'X', {
          verticalPosition: 'top',
          duration: 1000
        }),
        error: (error) => {
          console.log('EDIT ITEM ERROR', error);
          this.snackBar.open((error as HttpErrorResponse)?.error?.message || (error as HttpErrorResponse)?.statusText || 'something wrong', 'X', {
            verticalPosition: 'top',
            duration: 4000
          });
        }
      });
    }

    this.dialogRef.close();
  }
}
