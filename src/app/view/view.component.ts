import { Component, OnInit,AfterViewInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit,AfterViewInit {
public today:Date = new Date();
  constructor(private common:CommonService) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.common.showToast('top-right', 'info',`Welcome ${this.common.firstName} ${this.common.lastName} !`);

  }
}
