import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  apiURL: string = 'https://swapi.co/api/vehicles'

  constructor(private http: HttpClient) {

  }

  public getVehicle(id: string) {
    return this.http.get(`${this.apiURL}/${id}`);
  }

  public getVehicleByUrl(url: string) {
    return this.http.get(url);
  }
}
