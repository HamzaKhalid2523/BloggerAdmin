import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppError } from 'src/app/services/error/app-error';
import { BadInput } from 'src/app/services/error/bad-input';
import { UnAuthorized } from 'src/app/services/error/unauthorized-error';
import { AuthService } from 'src/app/services/core/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loadingSpinner: any = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private location: Location
  ) { }


  ngOnInit(): void {
    this.formInitializer();
  }

  goBackPage() {
    this.location.back();
  }

  formInitializer() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
        ],
      ]
    });
    this.loginForm.reset();
  }

  submitForm() {
    this.loadingSpinner = true;

    if (this.loginForm.invalid) {
      console.log(this.loginForm);
      this.loadingSpinner = false;
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      async (response) => {
        console.log(response);

        this.loadingSpinner = false;
        this.loginForm.reset();
        await this.authService.clearFieldDataFromStorage('current-user');
        await this.authService.setFieldDataToStorage('blogvio-token', response.token);
        await this.authService.setCurrentUser(response.data.user);
        this.router.navigateByUrl('/home');
      },
      (error: AppError) => {
        this.loadingSpinner = false;
        console.log('err', error);
        if (error instanceof BadInput) {
        } else if (error instanceof UnAuthorized) {
        } else {
          throw error;
        }
      }
    );
  }
}
