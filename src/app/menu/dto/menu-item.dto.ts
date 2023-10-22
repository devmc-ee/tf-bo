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
  image = '';

  constructor(group: Partial<IMenuItem>) {
    const entries = [];

    for (const key in this) {
      if (group[key as keyof IMenuItem]) {
        entries.push([key, group[key as keyof IMenuItem]]);
      }
    }

    Object.assign(this, Object.fromEntries(entries));
  }
}