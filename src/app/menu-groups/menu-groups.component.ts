import { Component, OnInit } from '@angular/core';
import { MenuGroupProvider } from './menu-groups.provider';
import { MenuGroup, MenuGroupColumn } from './menu-groups.type';
import { MatDialog } from '@angular/material/dialog';
import { MenuGroupDialogComponent } from './menu-group-dialog/menu-group-dialog.component';
import { DIALOG_MODE } from '../app.type';

@Component({
  selector: 'app-menu-groups',
  templateUrl: './menu-groups.component.html',
  styleUrls: ['./menu-groups.component.scss'],
  providers: [MenuGroupProvider],
})
export class MenuGroupsComponent implements OnInit {
  public data: MenuGroup[] = [];
  public displayedColumns = [MenuGroupColumn.name, MenuGroupColumn.description, MenuGroupColumn.actions];
  public columnName = MenuGroupColumn;

  constructor(
    public readonly menuGroupService: MenuGroupProvider,
    public readonly dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.updateData();
  }

  updateData() {
    this.menuGroupService.getGroups().subscribe({
      next: (value ) => this.data = value as MenuGroup[],
      error: (error) => console.log({ error })
    })
  }

  addGroup() {
    const dialogRef = this.dialog.open(
      MenuGroupDialogComponent, {
        data: { mode: DIALOG_MODE.NEW }
      }
    )

    dialogRef.afterClosed().subscribe(() => {
      this.updateData();
    })
  }

  editGroup(id: string) {
    const item = this.data.find((group) => group.id === id);
    const dialogRef = this.dialog.open(
      MenuGroupDialogComponent, {
        data: { mode: DIALOG_MODE.EDIT, ...item}
      }
    )
    dialogRef.afterClosed().subscribe(() => {
      this.updateData();
    })
  }

  async deleteGroup(id: string) {
    this.menuGroupService.deleteGroup(id).subscribe(() => this.updateData());
  }
}
