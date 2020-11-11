import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Weather } from './weather';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  locSearched : boolean = false;                //for the weather details heading to be displayed or not in html view

  location : string = '';                       //will be assigned the enter value by the user

  apiId : string = '';                          //the app key for the api
  url : string = '';                            // the api url    both are assigned inside the constructor

  weatherModel : Weather = new Weather('');     // a new weather object and the reference to be used in html form and will be fetched via ngform

  resultArray : any = null;                     // the get request response result will be stored
  error:any = null;                             // error response message will be stored


  constructor(private _http : HttpClient) 
  {
    this.url = 'http://api.openweathermap.org/data/2.5/weather?q=';
    this.apiId = '7cdf4c8736b8138bf2b687364098166d';
  }

  onSubmit(weatherForm : NgForm)                  // for assigning the entered loc from form to location property
  {
    this.locSearched = true;

    this.location = weatherForm.value.location;  //assigning the location from html form to location property

    this.getWeather(this.location);              //calling weather method to make the http get request

  }
  onReset()                                     //used for resetting the form and setting the properties to default values
  {
    this.locSearched = false;
    this.resultArray = null;
    this.error = null;
  }

  getWeather(location : string)                 /*to make the http get request and assigning the response to respective properties*/
  {
    return this._http.get<any>(this.url + location +'&units=metric'+ '&appid=' + this.apiId)
      .subscribe(
        data => {
          console.log(data);
          this.resultArray = data;},
        (err) => {
          this.error = err.error.message;}
        );
  }

  ngOnInit()
  {
    
  }


}
