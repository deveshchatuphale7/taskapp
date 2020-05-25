import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(private common:CommonService,private router:Router) { }

  userDataObj: any = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    contactNo: undefined,
    password: undefined,
    cnfPassword: undefined,
  };
  
  ngOnInit() {
  }

  public signup():void{
    if(this.userDataObj.firstName && this.userDataObj.lastName && this.userDataObj.email && this.userDataObj.contactNo && this.userDataObj.password && this.userDataObj.cnfPassword){
         
      if(this.userDataObj.contactNo.match(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g) == null){
          this.common.showToast('top-right', 'danger','Please enter valid contact number');            
         }
         else if(this.userDataObj.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g)== null){
          this.common.showToast('top-right', 'danger','Please enter valid email');
	
          
         }

    
    }else{
          this.common.showToast('top-right', 'danger','Please enter all details');
    }

    
    // this.common.showToast('top-right', 'success',':::');
    // this.router.navigate(["/home"]);
  }

  public signin():void{

    this.router.navigate(["/home"]);
  }


  private addusertodb(){
    this.common.httpPost('http://localhost:3000/add-user-db',{'email':'dcdevesh3@gmail.com','firstName':'Devesh','lastName':'Chatuphale'}).subscribe((res:any)=>{
      console.log(res);
    });
  }

}
