import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: UserInterface[];
  currentUser: UserInterface | null;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.userService.findAll()
      .subscribe((users) => {
        this.users = users;
      });

    // currentUser необходим для отображения меню
    this.authService.currentUser$
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
      });
  }

  logout() {
    this.authService.logout() // удалили куки с access token
      .subscribe(() => {
        this.authService.removeCurrentUser(); // и удалили текущего пользователя из localStorage
      });
  }
}
