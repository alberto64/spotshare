import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {

  activity: any;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    localStorage.setItem('route', this.router.url);
    this.userService.getUserActivityFromDB().pipe()
            .subscribe(
                data => {
                  this.activity = this.userService.getUserActivity();
                },
                error => {
                    alert("Error: Either the username or email are already in use or they are invalid.");
                });
  }

}
