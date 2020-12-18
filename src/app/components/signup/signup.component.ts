import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppError } from 'src/app/services/error/app-error';
import { BadInput } from 'src/app/services/error/bad-input';
import { UnAuthorized } from 'src/app/services/error/unauthorized-error';
import { AuthService } from 'src/app/services/core/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
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
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
        ],
      ],
      confPassword: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
          this.matchOtherValidator('password'),
        ]
      ]
    });
    this.registerForm.reset();
  }

  matchOtherValidator(otherControlName: string) {
    return (control: AbstractControl): { [key: string]: any } => {
      const otherControl: AbstractControl = control.root.get(otherControlName);

      if (otherControl) {
        const subscription: Subscription = otherControl.valueChanges.subscribe(
          () => {
            control.updateValueAndValidity();
            subscription.unsubscribe();
          }
        );
      }

      return otherControl && control.value !== otherControl.value
        ? { match: true }
        : null;
    };
  }

  submitForm() {
    this.loadingSpinner = true;

    if (this.registerForm.invalid) {
      console.log(this.registerForm);
      this.loadingSpinner = false;
      return;
    }

    this.authService.register(this.registerForm.value).subscribe(
      async (response) => {
        console.log(response);

        this.loadingSpinner = false;
        this.registerForm.reset();
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
