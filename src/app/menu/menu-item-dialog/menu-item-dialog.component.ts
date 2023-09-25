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

@Component({
  selector: 'menu-item-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule,],
  templateUrl: './menu-item-dialog.component.html',
  styleUrls: ['./menu-item-dialog.component.scss'],
  providers: [MenuProvider],
})
export class MenuItemDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MenuItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MenuItemDialogData,
    public readonly menuService: MenuProvider,
  ) { }

  async submit() {
    try {
      if (this.data.mode === DIALOG_MODE.NEW) {
        firstValueFrom(await this.menuService.createItem(new MenuItemDto(this.data)));
      } else {
        firstValueFrom( await this.menuService.editItem(this.data.id, new MenuItemDto(this.data)));
      }

      this.dialogRef.close();
    } catch (error) {
      console.error(error)
    }
  }
}
