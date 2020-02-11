import { Injectable } from '@angular/core';
import { Photo } from 'src/app/model/Photo';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { dbAlbum } from 'src/app/model/Album';
import { map, catchError, } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  fetchPhotos(albumId: number, amount: number): Observable<Photo[]> {
    let params = new HttpParams().set('albumId', albumId.toString()).set('_limit', amount.toString());
    return this.http.get<Photo[]>("https://jsonplaceholder.typicode.com/photos", { params })
      .pipe(catchError(this.handleError));
  }

  fetchAlbumTitle(albumId: number): Observable<string> {
    return this.http.get<dbAlbum>("https://jsonplaceholder.typicode.com/albums/" + albumId.toString()).pipe(map(
      (album: dbAlbum) => {
        return album.title;
      }
    )).pipe(catchError(this.handleError));
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
