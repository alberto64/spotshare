import { Component, OnInit, Input } from '@angular/core';
import { PostcardService } from '../postcard.service';
import { LocationService } from '../location.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-collection-hub',
  templateUrl: './collection-hub.component.html',
  styleUrls: ['./collection-hub.component.scss']
})

export class CollectionHubComponent implements OnInit {

  locations: any[];

  constructor(
    private postcardService: PostcardService,
    private locationService: LocationService,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.setItem('route', this.router.url);

    if(navigator.geolocation) {
      localStorage.setItem('route', this.router.url);
      navigator.geolocation.watchPosition(position => {
          console.log(position.coords);
          this.showPosition(position.coords.latitude, position.coords.longitude);
        });
    } else {
      alert("Geolocation not supported in this browser, you won't be able to use the application to it's fullest.");
    }
  }

  showPosition(lat: number, long: number) {
    this.locationService.getLocationFromFB(long, lat).pipe()
            .subscribe(
                data => {
                  this.locations = this.locationService.getLocations();
                },
                error => {
                  console.log(error);
                  alert(error.error.error + ': ' + error.error.statusCode + ' - ' + error.error.message);
                  if(error.error.statusCode == '403') {
                    localStorage.setItem('token', '');
                  }
                });

  }

  postPostcard(spot: any) {
    this.postcardService.postPostcard(spot).pipe()
    .subscribe(
        data => {
          alert("New Postcard Available");
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
