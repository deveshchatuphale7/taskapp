import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme'; // Added for themes popup and user popup 
import { filter, map } from 'rxjs/operators'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items = [
    { title: 'Settings' },
    { title: 'Signout' },
  ];
  userName:string;
  userEmail:string;

  constructor(private nbMenuService:NbMenuService,private router:Router) { }

  ngOnInit() {
    this.userEmail = localStorage.getItem('email');
    this.userName = `${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`;
  
    this.nbMenuService.onItemClick()
    .pipe(
      filter(({ tag }) => tag === 'my-context-menu'),
      map(({ item: { title } }) => title),
    )
    .subscribe(title => {
      console.log(title);
      switch(title){
        case "Signout":{
          localStorage.removeItem('email');
          localStorage.removeItem('firstName');
          localStorage.removeItem('lastName');
          localStorage.removeItem("timeToken");
          localStorage.removeItem('allTasks');
          this.router.navigate(['/auth']);
          break;  
        }
        case "Settings":{
          this.router.navigate(['home/settings']);
          break;
        }
      }
    });
  
  }

}
