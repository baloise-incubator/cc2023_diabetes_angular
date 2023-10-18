import { Component, OnDestroy, OnInit } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import { KeycloakProfile } from 'keycloak-js';
import { Observable, Subscription, from, map } from 'rxjs';
import { UserProfileService } from 'src/api/user-profile.service';
import { UserProfile } from '../app.component';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent implements OnDestroy {
  public username$: Observable<string | undefined>
  public dialogVisible: boolean = false;

  public userProfile: UserProfile = {sensitivityMorning: 0.0, sensitivityNoon: 0.0, sensitivityEvening: 0.0};
  
  subscription: Subscription;

  constructor(private keycloakService: KeycloakService, private userProfileService: UserProfileService){
    this.subscription = from(this.userProfileService.loadProfile()).subscribe((p: UserProfile) => {
      this.userProfile = {sensitivityMorning: p.sensitivityMorning, sensitivityNoon: p.sensitivityNoon, sensitivityEvening: p.sensitivityEvening}
    });
    this.username$ = from(this.keycloakService.loadUserProfile()).pipe(map((p: KeycloakProfile) => p.username))
   }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  saveUserProfile(){
    this.toggleDialog();
    this.userProfileService.saveProfile(this.userProfile).subscribe();
  }

  logout(){
    this.keycloakService.logout();
  }

  toggleDialog(){
    this.dialogVisible = !this.dialogVisible;
  }
}
