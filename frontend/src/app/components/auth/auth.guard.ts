import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class AuthGaurd implements CanActivate {

  constructor(private authService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    const url: string = state.url;
    return this.checkUserLogin(route, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.getIsAuth()) {
      const userRole = this.authService.getRole();

      if (route.data.role && route.data.role.indexOf(userRole) === -1) {
        this.router.navigate(['/Home']);

        return false;
      }

      return true;
    }

    this.router.navigate(['/Home']);

    return false;
  }
}
