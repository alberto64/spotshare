import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Postcard } from '../postcard';
import { PostcardService } from '../postcard.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  postcards: Postcard[];
  query: string;
  type: string;

  constructor(
    private route: ActivatedRoute,
    private postcardService: PostcardService,
    private router: Router,
    private location: Location ) { }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
    localStorage.setItem('route', this.router.url);
    if(this.type == 'public') {
      this.loadPostcards('');
    } else {
      if(this.type  == 'shared') {
        this.loadPostcards('');
      } else {
        if(this.type == 'collected') {
          this.loadPostcards('');
        }
        else {
          this.goBack();
        }
      }
    }
  }

  loadPostcards(query: string) {
    let type = '';
    if(this.type == 'public') {
      type = 'public';
    }
    if(this.type == 'shared') {
      type = 'shared';
    }
    this.postcardService.getPostcardsFromDB(type, 1, 100, query).pipe()
            .subscribe(
                data => {
                  this.postcards = this.postcardService.getPostcards();
                  this.postcardService.recordPostcardOrder();
                },
                error => {
                  console.log(error);
                  alert(error.error.error + ': ' + error.error.statusCode + ' - ' + error.error.message);
                  if(error.error.statusCode == '403') {
                    localStorage.setItem('token', '');
                  }
                });
  }

  submit() {
    this.loadPostcards(this.query.trim());
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}
