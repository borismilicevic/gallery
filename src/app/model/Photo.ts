export class Photo {
    id: number;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;

    constructor(id: number, albumId: number, title: string, url: string, thumbnailUrl: string) {
        this.id = id;
        this.albumId = albumId;
        this.title = title;
        this.url = url;
        this.thumbnailUrl = thumbnailUrl;
    }
}

