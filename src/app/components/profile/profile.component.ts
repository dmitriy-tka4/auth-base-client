import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: UserInterface;

  constructor(
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    // user получаем запросом на /profile
    // идентификатор пользователя для возврата его данных будет браться на сервере из токена
    this.userService.findCurrentUser()
      .subscribe((user) => {
        this.user = user;
      });
  }
}
