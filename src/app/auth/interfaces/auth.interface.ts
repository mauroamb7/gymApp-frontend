export interface AuthResponse {
  ok: boolean;
  nombre?: string;
  apellido?: string;
  email?: string;
  token?: string;
  rol: Rol[];
  uid?: string;
  dni?: number;
}

export interface Usuario {
  uid: string;
  nombre: string;
  rol: Rol[];
}

export interface Rol {
  uid: 'string';
  nombre: 'string';
}
