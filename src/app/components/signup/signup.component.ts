import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = this.formBulder.group({
    email: '',
    password: ''
  });

  constructor(
    private formBulder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    const userData = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    } as UserInterface;

    this.authService.signup(userData)
      .subscribe(() => {
        // можно добавить другие данные, если они необходимы для view
        const currentUser = {
          email: this.signupForm.value.email
        } as UserInterface;

        this.authService.setCurrentUser(currentUser);

        this.signupForm.reset();

        this.router.navigate(['/']);
      });
  }
}
