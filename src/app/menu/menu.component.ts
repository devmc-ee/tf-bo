import { Component, OnInit } from '@angular/core';
import { IMenu, IMenuCdn, MENU_ENTITY_TYPE, MenuGroup } from './menu.type';
import { MenuProvider } from './menu.provider';
import { MatDialog } from '@angular/material/dialog';
import { MenuItemDialogComponent } from './menu-item-dialog/menu-item-dialog.component';
import { DIALOG_MODE } from '../app.type';
import { MenuGroupDialogComponent } from './menu-group-dialog/menu-group-dialog.component';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { environment } from 'src/environments/environment';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/quality';
import { lazyload, placeholder } from '@cloudinary/ng';
import { Plugins } from '@cloudinary/html';

import * as cdnRes from '@cloudinary/url-gen';
import { ImageModalComponent } from './image-modal/image-modal.component';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuList: IMenu[] = [];
  menuFilteredList: IMenuCdn[] = [];
  selectedGroup: IMenu | null = null;
  groupTitle = 'All items';
  groupSubTitle = '';
  menuGroups: MenuGroup[] = [];
  img!: CloudinaryImage;
  cdn!: Cloudinary;
  plugins!: Plugins;

  constructor(
    private readonly menuService: MenuProvider,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,

  ) {}

  ngOnInit(): void {
    this.updateData();

    this.cdn = new Cloudinary({
      cloud: {
        cloudName: environment.cdnName
      }
    })
    this.plugins = [lazyload(), placeholder()];

    // @ts-ignore cloudinary global
  }


  uploadImage(itemId: string, groupId: string) {
    // @ts-ignore
    const widget = cloudinary!.createUploadWidget(
      {
        cloudName: environment.cdnName,
        uploadPreset: environment.cdnUploadPreset,
        // cropping: true, //add a cropping step
        showAdvancedOptions: true,  //add advanced options (public_id and tag)
        sources: [ "local", "url"], // restrict the upload sources to URL and local files
        multiple: false,  //restrict upload to a single file
        folder: "menu", //upload files to the specified folder
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'], //restrict uploading to image files only
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "purple", //change to a purple theme
      },
    // @ts-ignore cloudinary global
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          this.menuService.editItem(itemId, {
            image: result.info.public_id,
          }).subscribe({
            next: () => {
              this.snackBar.open('Done!', 'X', {
                verticalPosition: 'top',
                duration: 1000
              });
              this.updateData()
            },
            error: (error) => {
              this.snackBar.open((error as HttpErrorResponse)?.error?.message || (error as HttpErrorResponse)?.statusText || 'something wrong', 'X', {
                verticalPosition: 'top',
                duration: 4000
              });
            }
          })
        }
      }
    );
    widget.open();
  }

  updateData() {
    this.menuService.getMenu().subscribe({
      next: (data) => {
        this.menuList = data;

        this.menuGroups = data.map(({ id, name, description }) => ({ id, name, description }));

        this.menuFilteredList = this.menuList.map((group) => ({
          ...group,
          items: group.items.map((item) => ({
            ...item,
            imageCdn: this.cdn.image(item?.image as string || 'no_image_placeholder').resize(
              thumbnail()
                .width(75)
                .height(75)
            ).delivery(quality(auto()))
              .delivery(format(auto()))
              .roundCorners(byRadius(20))
          }))
        }));
        
      },
      error: (error) => console.error(error),
    })
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

  toggleVisibility(itemId: string, groupId: string) {
    const group = this.menuList.find(({ id }) => id === groupId);
    if (!group) {
      return;
    }

    const item = group.items.find(({ id }) => id === itemId);

    if (!item) {
      return;
    }

    this.menuService.editItem(itemId, {
      hidden: !item.hidden,
    }).subscribe({
      next: () => {
        this.snackBar.open('Done!', 'X', {
          verticalPosition: 'top',
          duration: 1000
        });
        this.updateData()
      },
      error: (error) => {
        this.snackBar.open((error as HttpErrorResponse)?.error?.message || (error as HttpErrorResponse)?.statusText || 'something wrong', 'X', {
          verticalPosition: 'top',
          duration: 4000
        });
      }
    })
  }

  openImageModal(publicId: string, name: string) {
    this.dialog.open(
      ImageModalComponent, {
        data: { publicId, name, cdnName: environment.cdnName }
      }
    )
  }
}


