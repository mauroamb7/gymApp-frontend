import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../../interfaces/userList.interface';
import { UserServiceService } from '../../services/user.service';

@Component({
  selector: 'app-acciones-usuario',
  templateUrl: './acciones-usuario.component.html',
  styleUrls: ['./acciones-usuario.component.css'],
})
export class AccionesUsuarioComponent implements OnInit {
  ok: boolean = false;
  spinner: boolean = true;
  user!: Usuario;
  id: string = '';

  constructor(
    private userService: UserServiceService,
    private route: ActivatedRoute
  ) {
    //atrapamos id de la url
    this.route.params.subscribe(({ id }) => {
      this.id = id;
    });
  }

  ngOnInit(): void {
    this.userService.getUserById(this.id).subscribe((resp) => {
      if (resp.ok) {
        this.spinner = false;
        this.user = resp.user;
      }
    });
  }
}
