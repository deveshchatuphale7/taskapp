import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  oldPassowrd:string;
  newPassoword:string;
  cnfNewPassword:string;

  public changeTheme(theme:string){
    this.themeService.changeTheme(theme);
  }

  public changePassoword(){
      if(this.oldPassowrd == undefined || 
        this.newPassoword == undefined ||
        this.cnfNewPassword == undefined){
          this.common.showToast('top-right','danger','Please enter all detais');

        }else{

          if(this.newPassoword != this.cnfNewPassword){
            this.common.showToast('top-right','danger',"New password doen't match");
          }else{
            this.common.httpPost('updatepwd',{email:localStorage.getItem("email"),oldPassowrd:this.oldPassowrd,newPassoword:this.newPassoword}).subscribe((res:any)=>{
              this.common.showToast('top-right','success',res.msg);
            },err=>{
              this.common.showToast('top-right','danger',"Something went wrong");
            });
          }
            
        }
  }

  constructor(private themeService:NbThemeService,private common:CommonService) { }

  ngOnInit() {
  }

}
