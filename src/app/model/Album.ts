import { Observable } from 'rxjs';

export interface dbAlbum {
    id: number;
    userId: number;
    title: string;
}


export class Album {
    id: number;
    creator: string;
    title: string;
    thumbnail$: Observable<string>;

    constructor(id: number, creator: string, title: string, thumbnail: Observable<string>) {
        this.id = id;
        this.creator = creator;
        this.title = title;
        this.thumbnail$ = thumbnail;
    }
}