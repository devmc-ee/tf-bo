import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';
import { MenuProvider } from '../menu.provider';
import { IMenu, IMenuDeleteConfirmationData, MENU_ENTITY_TYPE, MenuItemDialogData } from '../menu.type';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'delete-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, MatAutocompleteModule, NgFor, MatSelectModule],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss'],
  providers: [MenuProvider],
})
export class DeleteConfirmationDialogComponent {
  entityName = '';
  group?: IMenu;

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMenuDeleteConfirmationData,
    public readonly menuService: MenuProvider,
    private snackBar: MatSnackBar,

  ) {
    this.group = data.menu.find(({ id }) => id === data.groupId);

    if (!this.group) {
      this.snackBar.open('Group not found!', 'x', {
        verticalPosition: 'top'
      });

      throw new Error('Group not found');
    }

    this.entityName = this.group.name;

    if (data.type !== MENU_ENTITY_TYPE.ITEM) {
      return;
    }

    if (!data.id) {
      this.snackBar.open('Item id is not defined!', 'x', {
        verticalPosition: 'top'
      });

      throw new Error('Item ID is not defined!');
    }

    const item = this.group.items.find(({ id }) => data.id === id);

    if (!item) {
      this.snackBar.open('Item not found!', 'x', {
        verticalPosition: 'top'
      });
      throw new Error('Item not found');

    }

    this.entityName = item.name;
  }

  confirm() {
    if (this.data.type === MENU_ENTITY_TYPE.ITEM) {
      this.menuService.deleteItem(this.data.id!).subscribe({
        next: () => this.snackBar.open('Done!', 'X', {
          verticalPosition: 'top',
          duration: 1000
        }),
        error: (error) => {
          console.log('ADD ITEM ERROR', error);
          this.snackBar.open((error as HttpErrorResponse)?.error?.message || (error as HttpErrorResponse)?.statusText || 'something wrong', 'X', {
            verticalPosition: 'top'
          });
        }
      });
    } else {
      this.menuService.deleteGroup(this.data.groupId).subscribe({
        next: () => this.snackBar.open('Done!', 'X', {
          verticalPosition: 'top',
          duration: 1000
        }),
        error: (error) => {
          console.log('ADD ITEM ERROR', error);
          this.snackBar.open((error as HttpErrorResponse)?.error?.message || (error as HttpErrorResponse)?.statusText || 'something wrong', 'X', {
            verticalPosition: 'top'
          });
        }
      });
    }

    this.dialogRef.close();
  }
}
