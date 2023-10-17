import { Component } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import { KeycloakProfile } from 'keycloak-js';
import { Observable, from, map } from 'rxjs';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent {
  public username$: Observable<string | undefined>

  constructor(private keycloakService: KeycloakService){
    this.username$ = from(this.keycloakService.loadUserProfile()).pipe(map((p: KeycloakProfile) => p.username))
    
  }

  logout(){
    this.keycloakService.logout();
  }

}
