import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MenuProvider } from '../menu.provider';
import { IImageModalData } from '../menu.type';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule, NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { Plugins } from '@cloudinary/html';
import { CloudinaryModule, placeholder } from '@cloudinary/ng';
import { limitPad, pad } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto, autoGood } from '@cloudinary/url-gen/qualifiers/quality';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';

@Component({
  selector: 'image-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule,
    MatIconModule, 
    MatAutocompleteModule, 
    NgFor, 
    MatSelectModule, 
    CommonModule, 
    CloudinaryModule
  ],
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
  providers: [MenuProvider],
})
export class ImageModalComponent {
  imageCdn!: CloudinaryImage;
  plugins!: Plugins;
  constructor(
    public dialogRef: MatDialogRef<ImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IImageModalData,
  ) {

    const cdn = new Cloudinary({
      cloud: {
        cloudName: this.data.cdnName
      }
    });

    this.imageCdn = cdn.image(data.publicId).resize(limitPad().width(900).height(600)).delivery(quality(autoGood()))
      .delivery(format(auto()));

    this.plugins = [ placeholder({mode: 'blur'})];
  }
}
