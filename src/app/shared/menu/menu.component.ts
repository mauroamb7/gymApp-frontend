import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { menuItem } from '../interfaces/menu.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isLogged: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    //Para separar el menu
    this.authService.isLogged.subscribe((value) => {
      value ? (this.isLogged = true) : (this.isLogged = false);
    });
  }

  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
}
