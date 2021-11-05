export interface AuthResponse {
  ok: boolean;
  nombre?: string;
  email?: string;
  token?: string;
  rol?: Rol[];
  uid?: string;
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
