import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private SpotShareURL = 'https://spotshare-backend-staging.herokuapp.com/api/users';  // URL to web api
  private httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json'})
   };

  user: any;
  activity: any;

  constructor(
    private http: HttpClient) {
  }

  signInUser(username: string, password: string) : any {
    let user = {
      user: {
        username: username,
        password: password,
    }};
    return this.http.post<any>(this.SpotShareURL + "/login", user, this.httpOptions).pipe(
      map(user => {
                console.log(user.user.token);
                if (user.user.token) {
                    localStorage.setItem('token', user.user.token);
                    localStorage.setItem('username', user.user.username);
                }
                return user;
            }));
  }

  signUpUser(username: string, email: string, password: string) : any {
      let newUser = {
      user: {
        username: username,
        email: email,
        password: password,
      }};
      return this.http.post<any>(this.SpotShareURL, newUser, this.httpOptions).pipe(
        map(user => {
                  console.log(user.user.token);
                  if (user.user.token) {
                      localStorage.setItem('token', user.user.token);
                      localStorage.setItem('username', user.user.username);
                  }
                  return user;
              }));
  }

  getUserFromDB() {
    let query = new HttpParams();
    let httpOptions = new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('token')});

    return this.http.get<any>(this.SpotShareURL + '/' + localStorage.getItem('username'), {'headers': httpOptions, 'params':query}).pipe(
      map(user => {
          console.log(user);
          this.user = user.user;
      }));
  }

  getUser() {
    return this.user;
  }

  getUserActivityFromDB() {
    let query = new HttpParams();
    let httpOptions = new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('token')});

    return this.http.get<any>(this.SpotShareURL + '/activity', {'headers': httpOptions, 'params':query}).pipe(
      map(activity => {
          console.log(activity);
          this.activity = activity.activity;
      }));
  }

  getUserActivity() {
    return this.activity;
  }

  patchUser(pass: string, fName:string, lName:string, bDay: string) {
    let httpOptions = new HttpHeaders({'Content-Type':'application/json', 'Authorization': localStorage.getItem('token')});
    let user = {
      user: {

      }
    };
    if(pass != '') {
      user.user['password'] = pass;
    }
    if(fName != '') {
      user.user['firstName'] = fName;
    }
    if(lName != '') {
      user.user['lastName'] = lName;
    }
    if(bDay != '') {
      user.user['birthdate'] = bDay;
    }
    return this.http.patch<any>(this.SpotShareURL, user, {'headers': httpOptions}).pipe(
      map(user => {
                this.user = user.user;
            }));
  }
}
