import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const helper = new JwtHelperService();
    if(localStorage.getItem('timeToken') != undefined){
      const decodedToken = helper.decodeToken(localStorage.getItem('timeToken'));
    return decodedToken.email == localStorage.getItem('email');
    }else{
      return false;
    }
  }     
  constructor(private router:Router) { }
}
