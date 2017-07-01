import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpProvider {

  constructor(public http: Http) {
  }

  // Obtem dados do json
  obterDadosSismos(){
    //return this.http.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson').map(res => res.json());
    return this.http.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson').map(res => res.json());
  }

}
