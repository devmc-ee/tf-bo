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