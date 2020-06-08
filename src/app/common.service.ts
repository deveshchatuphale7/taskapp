import { Injectable } from '@angular/core';
import { NbToastrService,NbIconConfig } from '@nebular/theme';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})



export class CommonService {

  userLabels:string[] = ['Work','Personal','Shopping'];
  firstName:string = 'Devesh';
  lastName:string = 'Chatuphale';
  baseURL:string = 'http://localhost:3000/'; //  base url of endpoint
  
// Common function to run animation on selected html element
  public runAnimation(id:string,animName:string){
      console.log("runAnimation  ",id);
    const node = document.querySelector(id);
    node.classList.add('animated', animName);
 
    setTimeout(() => {
      node.classList.remove('animated', animName)
      node.removeEventListener('animationend', handleAnimationEnd)    
    }, 1000);

    function handleAnimationEnd() {
    }
}

// Anmate css function using promise 
   animateCSS = (element, animation, prefix = 'animate__') =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);
    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd() {
      node.classList.remove(`${prefix}animated`, animationName);
      node.removeEventListener('animationend', handleAnimationEnd);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd);
  });

// Function to show toast
  showToast(position, status,msg) {
    let iconName:string='';
    switch(status){
      case "info":{
        iconName = "bell-outline";
        break;
      }
      case "success":{
        iconName = "checkmark-circle-outline";
        break;
      }
      case "danger":{
        iconName = "alert-circle-outline";
        break;
      }
    }

    const iconConfig: NbIconConfig = { icon: iconName, pack: 'eva' };
    let duration = 3000;
    this.toastrService.show(
       '',
      msg,
      { position,status,duration,icon:iconConfig});
  }


  //Function for get rest api call
  httpGet(url){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json').append('Authorization', 'Bearer '+localStorage.getItem('timeToken'));
    
    return this.http.get(this.baseURL + url,{headers:headers});
  }

  // Function for post rest api call
  httpPost(route,params){

let headers: HttpHeaders = new HttpHeaders();
headers = headers.append('Accept', 'application/json').append('Authorization', 'Bearer '+ localStorage.getItem('timeToken'));

    return this.http.post(this.baseURL + route,params,{headers:headers});
  }

  constructor(private toastrService: NbToastrService,private http:HttpClient) {

   }
}
