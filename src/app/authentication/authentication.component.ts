import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(private common:CommonService) { }

  ngOnInit() {
  }

  public signup():void{
    this.common.showToast('top-right', 'success','Signup Clicked');
  }

}
