import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    // const authToken = this.userService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', this.userService.getToken)
    });

    return next.handle(authRequest);
  }
}
