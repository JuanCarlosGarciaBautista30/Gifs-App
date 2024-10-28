import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class GifsService {

  private _tagsHistory: string [] = []
  private apiKey: string = "rji633dIuZ8DfJ1omg8jO1r3Mr7bL5KT"; //  api url
  private serviceUrl: string ="https://api.giphy.com/v1/gifs"; // gif url


  constructor(private http: HttpClient) { }

  get tagHistory(){
    return [...this._tagsHistory]; // usamos spread
  }


  private organizedHistory(tag: string): void{
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {

      this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tag)
    }

    this._tagsHistory.unshift(tag) // agregamos el nuevo tag al inicio del arreglo
    this._tagsHistory = this._tagsHistory.splice(0,10);

  }


  searchTag(tag: string): void{

    if(tag.length === 0) return;
    this.organizedHistory(tag)

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag) // la búsqueda del usuario

    this.http.get(`${this.serviceUrl}/search`, {params}) // siempre agregar https//:
      .subscribe(res => {

        console.log(res);

      })
  }

}
