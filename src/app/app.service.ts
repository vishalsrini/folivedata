import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FoRate } from './model/fo-rate.interface';
import { forEach } from '../../node_modules/@angular/router/src/utils/collection';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  private foRatesFetchUrl = 'https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/foSecStockWatch.json';
  constructor(private _http: Http) { }

  getFoRates(): Observable<FoRate[]> {
    return this._http.get(this.foRatesFetchUrl)
      .pipe(map(data => {
        let foRates: any = data.json().data;
        console.log(JSON.stringify(foRates));
        let formattedFoRates: FoRate[] = [];
        let formattedFoRate: FoRate = {
          symbol: '',
          open: 0,
          high: 0,
          low: 0,
          ltp: 0,
          ntp: 0,
          trdVol: 0,
          chng: 0,
          perChng: 0,
          wtAvg: 0,
          deviation: 0
        };
        let i: number;
        for (i = 0; i < foRates.length; i++) {
          formattedFoRate.symbol = foRates[i].symbol;
          formattedFoRate.open = this.toNumber(foRates[i].open);
          formattedFoRate.high = this.toNumber(foRates[i].high);
          formattedFoRate.low = this.toNumber(foRates[i].low);
          formattedFoRate.ltp = this.toNumber(foRates[i].ltP);
          formattedFoRate.trdVol = this.toNumber(foRates[i].trdVol);
          formattedFoRate.ntp = this.toNumber(foRates[i].ntP);
          formattedFoRate.chng = this.toNumber(foRates[i].ptsC);
          formattedFoRate.perChng = this.toNumber(foRates[i].per);
          formattedFoRate.wtAvg = ((formattedFoRate.ntp*100)/formattedFoRate.trdVol);
          formattedFoRate.deviation = ((formattedFoRate.ltp - formattedFoRate.wtAvg)/formattedFoRate.wtAvg)*100;
          formattedFoRates.push({
            symbol: formattedFoRate.symbol,
            open: formattedFoRate.open, 
            high: formattedFoRate.high,
            low: formattedFoRate.low,
            ltp: formattedFoRate.ltp,
            trdVol: formattedFoRate.trdVol,
            ntp: formattedFoRate.ntp,
            chng: formattedFoRate.chng,
            perChng: formattedFoRate.perChng,
            wtAvg: formattedFoRate.wtAvg,
            deviation: formattedFoRate.deviation
          });
        }
        return formattedFoRates;
      }
      ));
  }

  toNumber(val: string): number {
    return Number(val.replace(/[^0-9.-]+/g, ""));
  }
}