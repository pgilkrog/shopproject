import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetPassword.component.html'
})

export class ResetPasswordComponent implements OnInit {
  isEmailValid = false;
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
      console.log(data.msg);
    });
  }

  resetPassword(): void {
    if (this.resetPassForm.value.password === this.resetPassForm.value.confirmPassword) {
      this.userService.resetPassword(this.checkEmailForm.value.password);
    }
  }
}
