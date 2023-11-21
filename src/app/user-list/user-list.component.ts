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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userService.getUsers();
    this.filteredUsers = [...this.users];
  }

  reloadUsers() {
    this.loadUsers();
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (!value) {
      this.filteredUsers = [...this.users];
      return;
    }

    const lowercaseValue = value.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(lowercaseValue) || user.email.toLowerCase().includes(lowercaseValue)
    );
  }
}
