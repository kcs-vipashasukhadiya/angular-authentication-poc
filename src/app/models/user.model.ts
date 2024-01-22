export class User{
  constructor(id: number, userName: string, email: string, password: string) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.password = password;
  }
  id: number;
  userName: string;
  email: string;
  password: string;
}
