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
  baseURL:string = 'http://localhost:3000/';
  

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


   animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd() {
      node.classList.remove(`${prefix}animated`, animationName);
      node.removeEventListener('animationend', handleAnimationEnd);

      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd);
  });

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

  httpGet(url){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json').append('Authorization', 'Bearer '+localStorage.getItem('timeToken'));
    
    return this.http.get(url,{headers:headers});
  }

  httpPost(route,params){

let headers: HttpHeaders = new HttpHeaders();
headers = headers.append('Accept', 'application/json').append('Authorization', 'Bearer '+ localStorage.getItem('timeToken'));

    return this.http.post(this.baseURL + route,params,{headers:headers});
  }

  constructor(private toastrService: NbToastrService,private http:HttpClient) {

   }
}
