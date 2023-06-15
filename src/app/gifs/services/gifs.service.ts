import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = []

  private _tagsHistory: string[] = [];
  private apiKey: string = 'k2CO48yRcrRYtZ2xqmQMaKAJNDIiJZfj';
  private searchUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gif service ready')
  }

  get tagHistory() {
    return [...this._tagsHistory]
  }

  private organizeTags( tag: string) {
    tag = tag.toLowerCase()
    if( this._tagsHistory.includes(tag)) {
      this._tagsHistory = this.tagHistory.filter( (oldTag) => oldTag !== tag )
    }
    this._tagsHistory.unshift(tag)
    this._tagsHistory = this.tagHistory.splice(0,10)
    this.saveLocalStorage()
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage(): void {
    if(!localStorage.getItem('history')) return
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!)
    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0])
  }


  searchTag( tag: string ): void {
    if (tag.length === 0 ) return;
    this.organizeTags(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '12')
      .set('q', tag)


    this.http.get<SearchResponse>(`${this.searchUrl}/search`, {params})

        .subscribe( resp => {
          this.gifList = resp.data
        })
  }

}
// servei que aglutina tota la llògica del gif component
