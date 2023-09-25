import { Component, OnInit } from '@angular/core';
import { IMenu } from './menu.type';
import { MenuProvider } from './menu.provider';
import { MatDialog } from '@angular/material/dialog';
import { MenuItemDialogComponent } from './menu-item-dialog/menu-item-dialog.component';
import { DIALOG_MODE } from '../app.type';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuList: IMenu[] = [];
  menuFilteredList: IMenu[] = [];
  selectedGroup: IMenu | null = null;
  groupTitle = 'All items';
  groupSubTitle = '';

  constructor(
    private readonly menuService: MenuProvider,
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.updateData();
  }

  updateData() {
    this.menuService.getMenu().subscribe({
      next: (data) => {
        this.menuList = data;

        if (!this.selectedGroup) {
          this.menuFilteredList = this.menuList;
        } else {
          const { id: groupId } = this.selectedGroup;
          this.selectedGroup = this.menuList.find(({ id }) => id === groupId) as IMenu;

          this.menuFilteredList = !this.selectedGroup  
            ? this.menuList
            : [this.selectedGroup]
        }
      },
      error: (error) => console.error(error),
    })
  }

  selectGroup(groupId: string) {
    this.selectedGroup = !groupId ? null : this.menuList.find(({ id }) => id === groupId) as IMenu;

    this.menuFilteredList = !this.selectedGroup  
      ? this.menuList
      : [this.selectedGroup]
  }

  editGroup(groupId: string) {
    
  }

  deleteGroup(groupId: string) {

  }

  addItem(groupId: string) {
    const dialogRef = this.dialog.open(
      MenuItemDialogComponent, {
        data: { mode: DIALOG_MODE.NEW, groupId }
      }
    )

    dialogRef.afterClosed().subscribe(() => {
      this.updateData();
    })
  }
  addGroup() {

  }

  
}
