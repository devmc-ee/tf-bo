import { APP } from '../app.type';

export interface MenuGroupBase {
  name: string;
  description: string;
}

export interface MenuGroup extends MenuGroupBase{
  id: string;
}

export const MenuGroupColumn = {
  id: 'id',
  name: 'name',
  description: 'description',
  actions: 'actions',
}

export interface MenuGroupDialogData extends MenuGroup {
  mode: APP.DialogMode
}

export interface IMenuIteBase {
  id: string;
  name: string;
  description: string;
  hidden: boolean;
  soldOut: boolean;
  price: string;
  code: string;
}

export interface IMenuItem extends IMenuIteBase {
  groupId: string;
}

export interface IMenu extends MenuGroup {
  items: IMenuItem[];
}

export interface MenuItemDialogData extends IMenuItem {
  mode: APP.DialogMode
}