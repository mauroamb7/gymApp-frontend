import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  usuario!: Usuario;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
  }

  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
}
