import { TfApiProvider } from 'src/providers/tf-api/tf-api.provider';
import { IMenu, IMenuIteBase, MenuGroupBase } from './menu.type';
import { Observable } from 'rxjs';
import { MenuItemDto } from './dto/menu-item.dto';

export class MenuProvider extends TfApiProvider {
  menuUrl = '/resto/v1/menu';
  menuItemsUrl = '/resto/v1/menu-items';
  menuGroupsUrl = '/resto/v1/menu-groups';

  getMenu() {
    return this.get(`${this.menuUrl}?empty-groups=true`) as Observable<IMenu[]> ;
  }

  createGroup({name, description}: MenuGroupBase) {
    return this.post(this.menuGroupsUrl, {name, description});
  }

  createItem(menuItem: MenuItemDto) {
    return this.post(this.menuItemsUrl, menuItem);
  }

  deleteGroup(id: string) {
    return this.delete(this.menuGroupsUrl, id);
  }

  deleteItem(id: string) {
    return this.delete(this.menuItemsUrl, id);
  }

  editGroup(id: string, data: Partial<MenuGroupBase>) {
    return this.patch(this.menuGroupsUrl, id, data);
  }

  editItem(id: string, data: Partial<MenuItemDto>) {
    return this.patch(this.menuItemsUrl, id, data);
  }


}