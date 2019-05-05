import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  private FacebookLocationAPI = 'https://graph.facebook.com/v3.2/search';  // URL to web api
  private httpOptions = new HttpHeaders({'Content-Type':'application/json'});
  private FacebookToken = '597239724107376|VtePkoRsic3Xmtg935xmqUtAnLc';
  private locations: any[];

  constructor(private http: HttpClient) { }

  getLocationFromFB(longitude: number, latitude: number) : any {

    let query = new HttpParams().append('type', 'place').append('center', latitude + ',' + longitude)
    .append('distance', '1000').append('fields', 'id,name,website,picture,location')
    .append('limit', '15').append('access_token', this.FacebookToken)
    .append('categories', '["ARTS_ENTERTAINMENT", "EDUCATION", "FITNESS_RECREATION", "FOOD_BEVERAGE", "HOTEL_LODGING", "MEDICAL_HEALTH", "SHOPPING_RETAIL", "TRAVEL_TRANSPORTATION"]');

    return this.http.get<any>(this.FacebookLocationAPI, {'headers':this.httpOptions, 'params':query}).pipe(
      map(locations => {
          console.log(locations);
          this.locations = locations.data;
      }));
  }

  getLocations() : any {
    return this.locations;
  }
}
