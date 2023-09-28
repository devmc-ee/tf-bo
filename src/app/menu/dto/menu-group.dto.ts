import { MenuGroup } from '../menu.type';

export class MenuGroupDto {
  name = '';
  description = '';

  constructor(group: Partial<MenuGroup>) {
    const entries = [];

    for (const key in this) {
      if (group[key as keyof MenuGroup]) {
        entries.push([key, group[key as keyof MenuGroup]]);
      }
    }

    Object.assign(this, Object.fromEntries(entries));
  }
}