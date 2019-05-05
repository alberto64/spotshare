import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Postcard } from './postcard';

@Injectable({
  providedIn: 'root'
})
export class PostcardService {

  private SpotShareURL = 'https://spotshare-backend-staging.herokuapp.com/api/postcards';  // URL to web api
  private httpOptions = new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('token')});
  private postcards: any[];
  private postcard: Postcard;
  private tags: any[];

  constructor(
    private http: HttpClient) {  }

  getPostcardsFromDB(type: string, pageNum: number, pageQuantity: number, q: string) : any {
    let query = new HttpParams().append('limit', String(pageQuantity))
    .append('page', String(pageNum));

    if(q.length > 0) {
      query = query.append('q', q);
    }

    if(type == 'shared' || type == 'public') {
      query = query.append('visibility',type);
    }

    return this.http.get<any>(this.SpotShareURL, {'headers':this.httpOptions, 'params':query}).pipe(
      map(postcards => {
          console.log(postcards);
          this.postcards = postcards.postcards;
      }));
  }

  getPostcardFromDB(pid: string) : any {
    let query = new HttpParams();

    return this.http.get<any>(this.SpotShareURL + "/" + String(pid), {'headers':this.httpOptions, 'params':query}).pipe(
      map(postcard => {
          console.log(postcard);
          this.postcard = postcard.postcard;
      }));
  }

  postPostcard(spot: string) : any {
    let newPostcard = {
      spot: spot
    };
    return this.http.post<any>(this.SpotShareURL, newPostcard, { 'headers':this.httpOptions }).pipe(
      map(postcard => {
                console.log(postcard);
            }));
  }

  postPostcardTag(pid:string, type:string, text:string) : any {

    let newTag = {
    tag: {
      type: type,
    }};
    if(text != ''){
      newTag.tag['text'] = text;
    }
    return this.http.post<any>(this.SpotShareURL + '/' + pid + '/tags', newTag, { 'headers':this.httpOptions }).pipe(
      map(tags => {
                console.log(tags);
                this.tags = tags.tags;
            }));
  }

  getPostcardTagsFromDB(pid:string) : any {
    let query = new HttpParams();

    return this.http.get<any>(this.SpotShareURL + "/" + String(pid) + "/tags", {'headers':this.httpOptions, 'params':query}).pipe(
      map(tags => {
          console.log(tags);
          this.tags = tags.tags;
      }));
  }

  getPostcardTags() {
    return this.tags;
  }

  getPostcards() : any {
    return this.postcards;
  }

  getPostcard() : Postcard {
    return this.postcard;
  }

  recordPostcardOrder() {
    let myMap = {};
    let i = 0;
    for(i = 0; i < this.postcards.length; i=i+1) {
      myMap[i] = this.postcards[i].id;
    }
    localStorage.setItem('maxPos', ''+i);
    console.log(JSON.stringify(myMap));
    localStorage.setItem('postcardOrder', JSON.stringify(myMap));
  }

  getPostcardId(position:number) : any {
    let myMap = JSON.parse(localStorage.getItem('postcardOrder'));
    console.log(myMap);
    if(myMap) {
      if(myMap[position]) {
        return myMap[position];
      }
    }
    return '-3';
  }

  patchPostcard(pid:string, title:String, imgURL:String, message:String) {
    let patch = {
    postcard: {
      title: title,
      imgUrl: imgURL,
      message: message
    }};

    return this.http.patch<any>(this.SpotShareURL + '/' + pid, patch, { 'headers':this.httpOptions}).pipe(
      map(postcard => {
          console.log(postcard);
          this.postcard = postcard.postcard;
      }));
  }

  removeTag(pid: string, type:string, text: string) {
    let query = new HttpParams().append('type', type);
    return this.http.delete<any>(this.SpotShareURL + '/' + pid + '/tags/' + text, { 'headers':this.httpOptions, 'params':query }).pipe(
      map(tags => {
                console.log(tags);
                this.tags = tags.tags;
            }));
  }


}
