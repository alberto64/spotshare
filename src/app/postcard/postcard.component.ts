import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PostcardService } from '../postcard.service';
import { Postcard } from '../postcard';


@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.scss']
})
export class PostcardComponent implements OnInit {

  postcard = new Postcard();
  left: number;
  right: number;
  tagToAdd: string;
  tags:any[];
  pid:string;
  type:string;
  maxPos:number;
  edit:string;
  editMode: boolean;
  previewMode: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private postcardService: PostcardService ) { }

  ngOnInit() {
    this.edit = 'On';
    this.editMode = false;
    this.tagToAdd = '';
    localStorage.setItem('route', this.router.url);
    this.pid = this.postcardService.getPostcardId(+this.route.snapshot.paramMap.get('pPos'));
    this.maxPos =  +localStorage.getItem('maxPos');
    console.log(+this.route.snapshot.paramMap.get('pPos'));
    if(+this.route.snapshot.paramMap.get('pPos') >= this.maxPos || +this.route.snapshot.paramMap.get('pPos')<0) {
      this.goBack();
    } else {
      this.type = this.route.snapshot.paramMap.get('type');
      this.postcardService.getPostcardFromDB(this.pid).pipe()
              .subscribe(
                  data => {
                    this.postcard = this.postcardService.getPostcard();
                    let left = +this.route.snapshot.paramMap.get('pPos') - 1;
                    let right = +this.route.snapshot.paramMap.get('pPos') + 1;
                    console.log(left);
                    console.log(right);
                    if(left >= 0 && left < this.maxPos) {
                      this.left = left;
                    }
                    if(right >= 0 && right < this.maxPos) {
                      this.right = right;
                    }
                  },
                  error => {
                    console.log(error);
                    alert(error.error.error + ': ' + error.error.statusCode + ' - ' + error.error.message);
                    if(error.error.statusCode == '403') {
                      localStorage.setItem('token', '');
                    }
                  });
      if(this.type == 'collected') {
        this.postcardService.getPostcardTagsFromDB(this.pid).pipe()
              .subscribe(
                data => {
                    this.tags = this.postcardService.getPostcardTags();
                },
                error => {
                  console.log(error);
                  alert(error.error.error + ': ' + error.error.statusCode + ' - ' + error.error.message);
                  if(error.error.statusCode == '403') {
                    localStorage.setItem('token', '');
                  }
                });
        }
      }
  }

  isUserOwner() : boolean {
    return this.type == 'collected';
  }

  editToggle(): void {
    if(this.editMode) {
      this.edit = 'On';
      this.editMode = false;
      this.previewMode = false;
      this.postcardService.getPostcardFromDB(this.pid).pipe()
              .subscribe(
                  data => {
                    this.postcard = this.postcardService.getPostcard();
                  },
                  error => {
                    console.log(error);
                    alert(error.error.error + ': ' + error.error.statusCode + ' - ' + error.error.message);
                    if(error.error.statusCode == '403') {
                      localStorage.setItem('token', '');
                    }
                  });

    } else {
      this.edit = 'Off';
      this.editMode = true;
    }
  }

  previewToggle() {
    if(this.previewMode) {
      this.previewMode = false;
    }
    else {
      this.previewMode = true;
    }
  }

  leftCheck() : boolean {
    return (this.left >= 0 && this.left < this.maxPos);
  }

  isInEditMode() : boolean {
    return this.editMode && this.isUserOwner();
  }

  isInViewOrPreview() : boolean {
    return (this.editMode && this.previewMode) || !this.editMode;
  }

  goBack(): void {
    if(this.route.snapshot.paramMap.get('type')) {
      this.router.navigate(['/album/' + this.route.snapshot.paramMap.get('type')]);
    } else {
      this.router.navigate(['/']);
    }
  }

  submitPostcard() : void {
    if(this.postcard.message.length > 500) {
      alert("Your message must be smaller or equal to 500 characters.")
      return;
    }
    this.postcardService.patchPostcard(this.pid, this.postcard.title, this.postcard.imgUrl.trim(), this.postcard.message).pipe()
          .subscribe(
            data => {
                this.postcard = this.postcardService.getPostcard();
            },
            error => {
              console.log(error);
              alert(error.error.error + ': ' + error.error.statusCode + ' - ' + error.error.message);
              if(error.error.statusCode == '403') {
                localStorage.setItem('token', '');
              }
            });
    this.editToggle();
  }

  submit() : void {
    let type = this.tagToAdd;
    let text = '';
    if(this.tagToAdd.toLowerCase() != 'public') {
      let words = this.tagToAdd.split(':');
      if(words.length != 2) {
        alert("The ':' symbol is must be used only to share and categore. (For public just write the word)");
        return;
      }
      if(words[0] != 'sharing' && words[0] != 'category') {
        alert("You must use the keywords 'public', sharing, or category for publishing a tag.");
        return;
      }
      let regexpUsername = new RegExp('^[a-zA-Z0-9]');
      if(!regexpUsername.test(words[1].trim()) || words[1].trim() == '') {
        alert("The tag or username must be a valid word made of alphanumeric characters only.");
        return;
      }
      type = words[0];
      text = words[1];
    }
    this.postcardService.postPostcardTag(this.pid, type.toLowerCase(), text.toLowerCase()).pipe()
          .subscribe(
            data => {
              this.tags = this.postcardService.getPostcardTags();
            },
            error => {
              console.log(error);
              alert(error.error.error + ': ' + error.error.statusCode + ' - ' + error.error.message);
              if(error.error.statusCode == '403') {
                localStorage.setItem('token', '');
              }
            });

  }

  removeTag(type:string, text: string) {
    this.postcardService.removeTag(this.pid, type, text).pipe()
          .subscribe(
            data => {
                this.tags = this.postcardService.getPostcardTags();
            },
            error => {
              console.log(error);
              alert(error.error.error + ': ' + error.error.statusCode + ' - ' + error.error.message);
              if(error.error.statusCode == '403') {
                localStorage.setItem('token', '');
              }
            });
  }
}
