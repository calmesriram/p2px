import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuradGuard implements CanActivate {
  
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.check_user().then(state=>{
      if(!state)
      {
        return true;
      }else{
        this.router.navigate(['menu'])
        return false;
      }
    })
  }
}


// canActivate() {
//   if (!this.auth.isLoggedIn()) {
//     this.router.navigateByUrl('/login');
//     return false;
//   }
//   return true;
// }