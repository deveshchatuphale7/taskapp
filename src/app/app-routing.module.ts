import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { ViewnoteComponent } from './viewnote/viewnote.component';
import { AddnoteComponent } from './addnote/addnote.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
{path:'auth',component:AuthenticationComponent},
{path:'home',component:HomeComponent,
children:[
  {path:'viewtasks',component:ViewComponent},
  {path:'addtask',component:AddnoteComponent},
  {path:'viewdetail',component:ViewnoteComponent},
  {path:'settings',component:SettingsComponent},
  {path:'',redirectTo:'viewtasks',pathMatch:'full'}
]},
{path:'',redirectTo:'auth',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
