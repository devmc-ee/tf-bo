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
  ) { }

  async submit() {
    try {
      if (this.data.mode === DIALOG_MODE.NEW) {
        firstValueFrom(await this.menuGroupService.createGroup(new MenuGroupDto(this.data)));
      } else {
        firstValueFrom( await this.menuGroupService.editGroup(this.data.id, new MenuGroupDto(this.data)));
      }

      this.dialogRef.close();
    } catch (error) {
      console.error(error)
    }
  }
}
