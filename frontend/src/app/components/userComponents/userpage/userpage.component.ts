import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html'
})

export class UserpageComponent implements OnInit {
  user?: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserById().subscribe(
      (data: any) => {
        console.log(data);
        (this.user) = (data.user as User);
      }
    );
  }
}
