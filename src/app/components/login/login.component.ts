import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {

  }

  onSubmit() {
    const authData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    } as UserInterface;

    this.authService.login(authData)
      .subscribe((response) => {
        console.log('login response', response);

        // можно добавить другие данные, если они необходимы для view
        const currentUser = {
          email: this.loginForm.value.email
        } as UserInterface;

        this.authService.setCurrentUser(currentUser);

        this.loginForm.reset();

        this.router.navigate(['/']);
      })
  }
}
