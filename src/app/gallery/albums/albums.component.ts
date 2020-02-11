import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/model/Album';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlbumService } from '../services/album.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albums: Album[] = null;

  currentUsername: string;
  horizontalDisplay: boolean = false;

  constructor(private authenticationService: AuthenticationService,
    private albumService: AlbumService,
    private router: Router) {
  }

  ngOnInit() {
    this.currentUsername = this.authenticationService.currentUser.email.split('@')[0];
    this.albumService.albums$
      .subscribe(
        (data: Album[]) => { this.albums = data; },
        (error) => { console.log(error); }
      );
  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigate(['../login']);
  }

}
