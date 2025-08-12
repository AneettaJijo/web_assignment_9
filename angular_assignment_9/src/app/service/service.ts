import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the structure of a SpaceX launch
export interface SpaceXLaunch {
  flight_number: number;
  name: string;
  date_utc: string;
  success: boolean | null;
  failure_reason?: string;
  details?: string;
  links: {
    webcast?: string;
    youtube_id?: string;
    article?: string;
    wikipedia?: string;
    patch?: {
      small?: string;
      large?: string;
    };
  };
  rocket: string;
  cores: Array<{
    core: string;
    flight: number;
    gridfins: boolean;
    legs: boolean;
    reused: boolean;
    landing_type?: string;
    landing_site?: string;
    landing_vehicle?: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://api.spacexdata.com/v4/launches';

  constructor(private http: HttpClient) {}

  getLaunches(): Observable<SpaceXLaunch[]> {
    return this.http.get<SpaceXLaunch[]>(this.apiUrl);
  }
}