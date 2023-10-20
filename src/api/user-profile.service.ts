import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import { UserProfile} from "../app/app.component";

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private baseUrl = 'spring/json/user-profile'; // Adjust the URL if needed

  constructor(private http: HttpClient) {}

  loadProfile(): Observable<UserProfile>{
    return this.http.get<UserProfile>(this.baseUrl);
  }

  saveProfile(profile: UserProfile) : Observable<void>{
    return this.http.put<void>(this.baseUrl, profile);
  }
}
