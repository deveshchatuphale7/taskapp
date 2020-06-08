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

    loaderFlag:boolean = false;
  ngOnInit() {
  }


  //Function to sign in user 
  public signupUser(userDataObj:any):void{
    if(userDataObj.firstName && userDataObj.lastName && userDataObj.email && userDataObj.contactNo && userDataObj.password && userDataObj.cnfPassword){
         
      if(userDataObj.contactNo.match(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g) == null){
          this.common.showToast('top-right', 'danger','Please enter valid contact number');            
      }
      else if(userDataObj.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g)== null){
          this.common.showToast('top-right', 'danger','Please enter valid email');
      }else if(userDataObj.password != userDataObj.cnfPassword){
        this.common.showToast('top-right', 'danger','Passwords doesnt match');
      }
      else{
        this.loaderFlag = true;
      let sub$ = this.common.httpPost('signup',userDataObj).subscribe((res:any)=>{
          this.loaderFlag = false;
          setTimeout(() => {
            sub$.unsubscribe();  
          }, 2000);

          if(res.statusCode != 200){
            this.common.showToast('top-right', 'danger',res.msg);
          }else{
            this.common.showToast('top-right', 'success','Signup successful !');
            for(let key in userDataObj){
              userDataObj[key] = undefined;
            }
          }
        },((err:any)=>{
          this.loaderFlag = false;
          this.common.showToast('top-right', 'danger',err.msg || 'Something went wrong !');
        }));
      } 

    }else{
          this.common.showToast('top-right', 'danger','Please enter all details');
    }

    // this.common.showToast('top-right', 'success',':::');
    // this.router.navigate(["/home"]);
  }

  public signinUser(signinObj:any):void{

    if(signinObj.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g)== null){
      this.common.showToast('top-right', 'danger','Please enter valid email');
    }else if(signinObj.password.length == 0){
      this.common.showToast('top-right', 'danger','Please enter password');
    }else{
      this.loaderFlag = true;
      let sub$ = this.common.httpPost('signin',signinObj).subscribe((res:any)=>{
        this.loaderFlag = false;
         this.common.showToast('top-right', 'info',`Welcome ${res.msg.firstName} ${res.msg.lastName} !`);
        localStorage.setItem("email",res.msg.email);
        localStorage.setItem("firstName",res.msg.firstName);
        localStorage.setItem("lastName",res.msg.lastName);
        localStorage.setItem("timeToken",res.msg.token);
          setTimeout(() => {
             this.router.navigate(["/home"]); 
             sub$.unsubscribe();   
          }, 600);
      },err=>{
        this.loaderFlag = false;
      if(err.status == 401){
          this.common.showToast('top-right', 'danger',err.msg || 'Invalid credentials ');
        }else{
          this.common.showToast('top-right', 'danger',err.msg || 'Something went wrong !');
        } 
      });
    }    
  }


  private addusertodb(){
    this.common.httpPost('http://localhost:3000/add-user-db',{'email':'dcdevesh3@gmail.com','firstName':'Devesh','lastName':'Chatuphale'}).subscribe((res:any)=>{
      console.log(res);
    });
  }

}
