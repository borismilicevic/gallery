import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { dbUser } from 'src/app/model/User';
import { Observable, forkJoin, throwError } from 'rxjs';
import { dbAlbum, Album } from 'src/app/model/Album';
import { Photo } from 'src/app/model/Photo';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  public usersData$: Observable<dbUser[]>;
  public albumsData$: Observable<dbAlbum[]>;

  public albums$: Observable<Album[]>;

  constructor(private http: HttpClient) {
    this.usersData$ = this.http.get<dbUser[]>("https://jsonplaceholder.typicode.com/users");
    this.albumsData$ = this.http.get<dbAlbum[]>("https://jsonplaceholder.typicode.com/albums?_limit=6");
    this.albums$ = forkJoin([this.albumsData$, this.usersData$]).pipe(map(
      (result) => {
        let albums: Album[] = [];
        result[0].forEach((albumData) => {
          albums.push(new Album(
            albumData.id,
            result[1].find((user) => user.id === albumData.userId).name,
            albumData.title,
            this.http.get<Photo[]>("https://jsonplaceholder.typicode.com/photos?_limit=1&albumId=" + albumData.id)
              .pipe(map(
                (photo) => {
                  return photo[0].thumbnailUrl;
                }
              ))));
        });
        return albums;
      }
    ), catchError(this.handleError));
  }

  public getUsers(): Observable<dbUser[]> {
    return this.http.get<any[]>("https://jsonplaceholder.typicode.com/users");
  }

  private handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
