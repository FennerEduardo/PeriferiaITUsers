import { UserService } from './service/user-service.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from './model/UserModel';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUser: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userService.getUsers();
    this.filteredUsers = [...this.users];
    this.selectedUser = null;
  }

  reloadUsers() {
    this.loadUsers();
  }

  reloadUsersFromApi() {
    this.userService
      .getUsersFromApi()
      .then((users) => {
        this.users = [...users];
        this.filteredUsers = [...users];
        this.selectedUser = null;
      })
      .catch((error) => {
        this.loadUsers();
        console.log(error);
      });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (!value) {
      this.filteredUsers = [...this.users];
      return;
    }

    const lowercaseValue = value.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowercaseValue) ||
        user.email.toLowerCase().includes(lowercaseValue)
    );
  }

  getUserById(id: Number) {
    const user = this.users.find((user) => user.id === id);
    this.selectedUser = user;
  }
}
