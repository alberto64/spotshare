import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  user: string;
  email: string;
  pass: string;
  fname: string;
  lname: string;
  date: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    localStorage.setItem('route', this.router.url);
    this.userService.getUserFromDB().pipe()
            .subscribe(
                data => {
                  let user = this.userService.getUser();
                  this.user = user.username;
                  this.email = user.email;
                  this.pass = '';
                  this.fname = user.firstName;
                  if(!this.fname) {
                    this.fname = '';
                  }
                  this.lname = user.lastName;
                  if(!this.lname) {
                    this.lname = '';
                  }
                  this.date = user.birthdate;
                  if(!this.date) {
                    this.date = '';
                  }
                },
                error => {
                    alert("Error: Either the username or email are already in use or they are invalid.");
                });
  }

  submit(): void {
    let regexpPassword = new RegExp('^[a-zA-Z0-9]{4,12}$');
    if(this.pass != '' && !regexpPassword.test(this.pass.trim())) {
      alert("Error: Invalid Password (Must be any number or character lenght 4 to 12)");
      return;
    }
    let regexpDate = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}.*$');
    if(!regexpDate.test(this.date.trim())) {
      alert("Error: Invalid Date, Must be in format: yyyy-mm-dd");
      return;
    }

    this.userService.patchUser(this.pass, this.fname, this.lname, this.date).pipe()
            .subscribe(
                data => {
                  let user = this.userService.getUser();
                  this.user = user.username;
                  this.email = user.email;
                  this.pass = '';
                  this.fname = user.firstName;
                  if(!this.fname) {
                    this.fname = '';
                  }
                  this.lname = user.lastName;
                  if(!this.lname) {
                    this.lname = '';
                  }
                  this.date = user.birthdate;
                  if(!this.date) {
                    this.date = '';
                  }
                },
                error => {
                  console.log(error);
                  alert(error.error.error + ': ' + error.error.statusCode + ' - ' + error.error.message);
                  if(error.error.statusCode == '403') {
                    localStorage.setItem('token', '');
                  }
                });
  }

  goBack(): void {
    this.location.back();
  }

}
