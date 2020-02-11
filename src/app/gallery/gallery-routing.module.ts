import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { AuthGuard } from '../auth.guard';
import { AlbumsComponent } from './albums/albums.component';
import { PhotosComponent } from './photos/photos.component';


const routes: Routes = [
  {
    path: '',
    component: GalleryComponent,
    children: [
      { path: 'albums', canActivate: [AuthGuard], component: AlbumsComponent },
      { path: 'album/:id', canActivate: [AuthGuard], component: PhotosComponent },
      { path: '', redirectTo: 'albums', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
