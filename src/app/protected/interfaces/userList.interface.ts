export interface UserList {
  total: number;
  usuarios: Usuario[];
}

export interface userResponse {
  ok: boolean;
  msg?: string;
  user: Usuario;
}

export interface Usuario {
  nombre: string;
  apellido: string;
  email: string;
  dni: number;
  rol: Rol[];
  estado: boolean;
  google: boolean;
  createdAt: Date;
  uid: string;
}

export interface Rol {
  _id: string;
  nombre: string;
}
