import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery/gallery.component';
import { AlbumsComponent } from './albums/albums.component';
import { HttpClientModule } from '@angular/common/http';
import { PhotosComponent } from './photos/photos.component';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  declarations: [GalleryComponent, AlbumsComponent, PhotosComponent, DialogComponent],
  entryComponents: [
    DialogComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    GalleryRoutingModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonToggleModule
  ]
})
export class GalleryModule { }
