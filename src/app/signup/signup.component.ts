import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  user: string;
  email: string;
  pass: string;
  logged: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    localStorage.setItem('route', this.router.url);
  }

  submit(): void {
    let regexpUsername = new RegExp('^[a-zA-Z0-9]{2,12}$');
    if(!regexpUsername.test(this.user.trim()) || this.user.trim() == '') {
      alert("Error: Invalid Username (Must be any number or character lenght 2 to 12)");
      return;
    }
    let regexpEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
    if(!regexpEmail.test(this.email.trim())) {
      alert("Error: Invalid Email");
      return;
    }
    let regexpPassword = new RegExp('^[a-zA-Z0-9]{4,12}$');
    if(!regexpPassword.test(this.pass.trim()) || this.pass.trim() == '') {
      alert("Error: Invalid Password (Must be any number or character lenght 4 to 12)");
      return;
    }
    this.userService.signUpUser(this.user.trim(), this.email.trim(), this.pass.trim()).pipe()
            .subscribe(
                data => {
                    this.router.navigate(['/collection-hub']);
                },
                error => {
                    alert("Error: Either the username or email are already in use or they are invalid.");
                });
  }

  goBack(): void {
    this.location.back();
  }

}
