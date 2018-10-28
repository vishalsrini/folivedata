import { Component } from '@angular/core';

import { AppService } from './app.service';
import { FoRate } from './model/fo-rate.interface'
;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'FoLiveData'; 
  foRates: FoRate[];
  constructor(private _service: AppService) {}
  
  ngOnInit(): void{
    this._service.getFoRates()
    .subscribe(foRates => {
      this.foRates = foRates;
      console.log(JSON.stringify(this.foRates));
    })
  }
}
