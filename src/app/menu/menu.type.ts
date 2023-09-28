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
  mode: APP.DialogMode,
  groups: MenuGroup[],
  group: IMenu,
}

export const MENU_ENTITY_TYPE = {
  GROUP: 'group',
  ITEM: 'item',
} as const;
export interface IMenuDeleteConfirmationData {
  id?: string;
  type: typeof MENU_ENTITY_TYPE[keyof typeof MENU_ENTITY_TYPE];
  menu: IMenu[];
  groupId: string;
}