import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: string;
  password: string;
  logged: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    localStorage.setItem('route', this.router.url);
  }

  submit(): void {
    this.logged = false;
    this.userService.signInUser(this.user, this.password).pipe()
            .subscribe(
                data => {
                  this.router.navigate(['/collection-hub']);
                },
                error => {
                  alert("Error: Invalid Credentials.");
                });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }


}
