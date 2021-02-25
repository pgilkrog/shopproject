import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signupsignin',
  templateUrl: './signupsignin.component.html',
  styleUrls: ['./signupsignin.component.sass']
})

export class SignupSigninComponent implements OnInit {
  signinForm: FormGroup = new FormGroup({});
  signupForm: FormGroup = new FormGroup({});
  isSignin = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.signupForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  changeForm(): void {
    this.isSignin = !this.isSignin;
  }

  signup(): void {
    const newUser: User = {
      _id: '',
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    };

    this.userService.createUser(newUser);
  }

  signin(): void {
    const user: User = {
      _id: '',
      name: '',
      email: this.signinForm.value.email,
      password: this.signinForm.value.password
    };

    this.userService.signin(user);
  }
}
