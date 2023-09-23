import { MenuGroup } from '../menu-groups.type';

export class MenuGroupDto {
  name = '';
  description = '';

  constructor(group: Partial<MenuGroup>) {
    Object.assign(this, group);
  }
}