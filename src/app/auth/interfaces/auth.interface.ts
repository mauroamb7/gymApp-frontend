export interface AuthResponse {
  ok: boolean;
  nombre?: string;
  email?: string;
  token?: string;
}

export interface Usuario {
  uid: string;
  nombre: string;
}
