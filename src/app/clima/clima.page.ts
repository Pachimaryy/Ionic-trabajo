import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http'



@Component({
  selector: 'app-clima',
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
})
export class ClimaPage implements OnInit {

  constructor(public httpClient:HttpClient) { 
    this.loadData()
  }

  loadData(){
    this.httpClient.get('https://api.openweathermap.org/data/3.0/onecall?lat=32.55&lon=71.43&exclude=hourly,daily&appid=57ecb83a2e4f92309201df0126d7aad0').subscribe(results =>{
      console.log(results);
    })

  }



  ngOnInit() {
  }

}
