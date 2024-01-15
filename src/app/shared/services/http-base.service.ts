import { Injectable } from '@angular/core';
import { Environment } from '../../core/environment/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class HttpBaseService {

  private _apiUrl: string = '';

  constructor() {
    this.setEnvironment();
  }


  public get apiUrl() {
    return `${this._apiUrl}/api`;
  }

  private set apiUrl(apiUrl) {
    this._apiUrl = apiUrl;
  }

  private setEnvironment() {
    this.apiUrl = Environment.apiUrl
  }
}
