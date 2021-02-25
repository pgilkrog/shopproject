import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.sass']
})

export class ResetPasswordComponent implements OnInit {
  isEmailValid = false;
  email = '';
  response = '';

  checkEmailForm: FormGroup = new FormGroup({});
  resetPassForm: FormGroup = new FormGroup({});

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.checkEmailForm = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.resetPassForm = new FormGroup({
      password: new FormControl(null, {
        validators: [Validators.required]
      }),
      confirmPassword: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  checkEmail(): void {
    this.userService.checkUserByEmail(this.checkEmailForm.value.email).subscribe((data: any) => {
      this.isEmailValid = data.msg;
      !data.msg ? this.response = `* Can't find user!` : this.response = '';
    });
  }

  resetPassword(): void {
    if (this.resetPassForm.value.password === this.resetPassForm.value.confirmPassword) {
      this.userService.resetPassword(this.resetPassForm.value.password, this.checkEmailForm.value.email);
      this.response = '';
    } else {
      this.response = `* Password is not matching!`;
    }
  }
}
