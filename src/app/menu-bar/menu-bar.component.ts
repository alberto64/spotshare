import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})

export class MenuBarComponent implements OnInit {

  accessKey : String;
  username: string;
  public isCollapsed;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.isCollapsed = true;
    console.log(this.accessKey);
    this.username = localStorage.getItem('username');
  }

  signOut() {
    this.accessKey = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }

  goToHome() {
    if(this.loggedIn()) {
      this.router.navigate(['/collection-hub']);
    }
    else {
      this.router.navigate(['/']);
    }
  }

  gotUsername() {
    if(localStorage.getItem('username')) {
      this.username = localStorage.getItem('username');
      return true;
    }
    return false;
  }

  loggedIn() {
    let location = localStorage.getItem('route');
    if(localStorage.getItem('token') == '') {
      this.signOut();
      return false;
    }
    if(localStorage.getItem('token')) {
      if(location == '/' || location == '/login' || location == '/signup' || location == '/mainpage') {
        localStorage.setItem('route', '/collection-hub');
        this.goToHome();
      }
      return true;
    }
    if(location && location != '/login' && location != '/signup' && location != '/mainpage' && location != '/contact-us') {
      localStorage.setItem('route', '/mainpage');
      this.goToHome();
    }
    return false;
  }
}
