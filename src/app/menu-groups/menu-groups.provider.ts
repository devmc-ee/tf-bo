import { TfApiProvider } from 'src/providers/tf-api/tf-api.provider';
import { MenuGroupBase } from './menu-groups.type';

export class MenuGroupProvider extends TfApiProvider {
  url = '/resto/v1/menu-groups';

  getGroups() {
    return this.get(this.url);
  }

  async createGroup({name, description}: MenuGroupBase) {
    return this.post(this.url, {name, description});
  }

  deleteGroup(id: string) {
    return this.delete(this.url, id);
  }

  async editGroup(id: string, data: Partial<MenuGroupBase>) { console.log({data})
    return this.patch(this.url, id, data);
  }
}