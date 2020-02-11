import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { Photo } from 'src/app/model/Photo';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  albumId: number;
  albumTitle: string;
  photos: Photo[];

  filteredPhotos: Photo[];
  filter: string;
  horizontalDisplay: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.albumId = parseInt(params.get('id'));
      if (isNaN(+params.get('id'))) {
        this.router.navigate(["../page-not-found"]);
      }

      this.photos = JSON.parse(localStorage.getItem("photos?albumId=" + this.albumId.toString()));
      this.albumTitle = JSON.parse(localStorage.getItem("title?albumId=" + this.albumId.toString()));

      if (this.albumTitle === null) {
        this.photoService.fetchPhotos(this.albumId, 20).subscribe(
          (photos) => {
            this.photos = photos;
            this.filteredPhotos = this.photos;
            localStorage.setItem("photos?albumId=" + this.albumId.toString(), JSON.stringify(this.photos));
          },
          (error) => { console.log(error); this.router.navigate(["../page-not-found"]); }
        );

        this.photoService.fetchAlbumTitle(this.albumId).subscribe(
          (title) => {
            this.albumTitle = title;
            localStorage.setItem("title?albumId=" + this.albumId.toString(), JSON.stringify(this.albumTitle));
          },
          (error) => { console.log(error); this.router.navigate(["../page-not-found"]); }
        );
      }
      else
        this.filteredPhotos = this.photos;
    });

  }

  filterPhotos() {
    this.filteredPhotos = this.photos.filter((photo: Photo) => {
      return photo.title.toLowerCase().includes(this.filter.trim().toLowerCase());
    });
  }

  deletePhoto(removedPhoto: Photo) {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw !important',
      data: { message: "Da li si siguran da želiš da obrišeš " + removedPhoto.title + "?" }
    });

    dialogRef.afterClosed().subscribe((answer) => {
      if (answer) {
        this.photos = this.photos.filter((photo: Photo) => { return photo.id !== removedPhoto.id });
        this.filteredPhotos = this.filteredPhotos.filter((photo: Photo) => { return photo.id !== removedPhoto.id });
        localStorage.setItem("photos?albumId=" + this.albumId.toString(), JSON.stringify(this.photos));
      }
    });
  }

}
