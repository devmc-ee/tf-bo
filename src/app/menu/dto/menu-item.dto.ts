import { IMenuItem } from '../menu.type';

export class MenuItemDto {
  id = '';
  groupId = '';
  name = '';
  description = '';
  hidden = false;
  soldOut = false;
  price = '';
  code = '';

  constructor(group: Partial<IMenuItem>) {
    Object.assign(this, group);
  }
}