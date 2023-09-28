import { Component, OnInit } from '@angular/core';
import { IMenu, MENU_ENTITY_TYPE, MenuGroup } from './menu.type';
import { MenuProvider } from './menu.provider';
import { MatDialog } from '@angular/material/dialog';
import { MenuItemDialogComponent } from './menu-item-dialog/menu-item-dialog.component';
import { DIALOG_MODE } from '../app.type';
import { MenuGroupDialogComponent } from './menu-group-dialog/menu-group-dialog.component';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';

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
  menuGroups: MenuGroup[] = [];

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

        this.menuGroups = data.map(({ id, name, description }) => ({ id, name, description }));

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
    const group = this.menuList.find(({ id }) => id === groupId) ||{};

    const dialogRef = this.dialog.open(
      MenuGroupDialogComponent, {
        data: { mode: DIALOG_MODE.EDIT, ...group }
      }
    )

    dialogRef.afterClosed().subscribe({
      next: () => this.updateData(),
      error: (error) => {
        console.log(error)
      } 
    })
  }

  deleteGroup(groupId: string) {
    const dialogRef = this.dialog.open(
      DeleteConfirmationDialogComponent, {
        data: { type: MENU_ENTITY_TYPE.GROUP, groupId, menu: this.menuList }
      }
    )

    dialogRef.afterClosed().subscribe(() => {
      this.updateData();
    })

  }

  addItem(groupId: string) {
    const group = this.menuList.find(({ id }) => id === groupId) ||{};

    const dialogRef = this.dialog.open(
      MenuItemDialogComponent, {
        data: { mode: DIALOG_MODE.NEW, groupId, group: Object.assign({}, group), groups: this.menuGroups }
      }
    )

    dialogRef.afterClosed().subscribe({
      next: () => this.updateData(),
      error: (error) => {
        console.log('addItem',error)
      } 
    })
  }
  addGroup() {
    const dialogRef = this.dialog.open(
      MenuGroupDialogComponent, {
        data: { mode: DIALOG_MODE.NEW}
      }
    )

    dialogRef.afterClosed().subscribe(() => {
      this.updateData();
    })
  }
  editItem(itemId: string, groupId: string) {
    const group = this.menuList.find(({ id }) => id === groupId);
    if (!group) {
      return;
    }

    const item = group.items.find(({ id }) => id === itemId);

    if (!item) {
      return;
    }

    const dialogRef = this.dialog.open(
      MenuItemDialogComponent, {
        data: { mode: DIALOG_MODE.EDIT, ...item, group: Object.assign({}, group), groups: this.menuGroups}
      }
    )

    dialogRef.afterClosed().subscribe(() => {
      this.updateData();
    })
  }
  deleteItem(id: string, groupId: string) {
    const dialogRef = this.dialog.open(
      DeleteConfirmationDialogComponent, {
        data: { type: MENU_ENTITY_TYPE.ITEM, id, groupId, menu: this.menuList }
      }
    )

    dialogRef.afterClosed().subscribe(() => {
      this.updateData();
    })
  }
}
