import { User } from './../model/UserModel';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'jonh@doe.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@doe.com' },
    { id: 3, name: 'Fenner González', email: 'fenner@fennereduardo.com' },
  ];

  getUsers(): User[] {
    return this.users;
  }
}
