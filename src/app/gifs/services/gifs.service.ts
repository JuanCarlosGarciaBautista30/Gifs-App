import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})

export class GifsService {

  public gifList: Gif[] = []; // contiene la lista de los gifs que se muestran.

  private _tagsHistory: string [] = []
  private apiKey:       string = "rji633dIuZ8DfJ1omg8jO1r3Mr7bL5KT"; //  api url
  private serviceUrl:   string ="https://api.giphy.com/v1/gifs"; // gif url


  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Servive Ready');
  }

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
    this.saveLocalStorage();
  }

  // método para gravar en el local storage el historial
  private saveLocalStorage(): void{
    //JSON.stringify convierte un objeto o arreglo a string
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage(): void{
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')! )

    if(this._tagsHistory.length === 0 ) return;
    this.searchTag(this._tagsHistory[0]);

  }



  searchTag(tag: string): void{


    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag) // la búsqueda del usuario

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params}) // siempre agregar https//:
      .subscribe( resp => {

        this.gifList = resp.data;
        /* console.log({gifs: this.gifList }); */


      })
  }

}
