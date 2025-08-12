import { Component, OnInit } from '@angular/core';
import { DataService, SpaceXLaunch } from '../../service/service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-api-data',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./api-data.css'],
  template: `
    <div class="container">
  <h2>SpaceX Launches</h2>

  @if (loading) {
    <div class="loading">
       Loading SpaceX launches...
    </div>
  } @else if (error) {
    <div class="error">
      {{ error }}
    </div>
  } @else {
    <div class="launches-grid">
      @for (launch of launches; track launch.flight_number) {
        <div class="launch-card">
          <div class="launch-header">
            <h3>{{ launch.flight_number }}: {{ launch.name }}</h3>
            <span 
              class="status"
              [class.success]="launch.success === true"
              [class.failed]="launch.success === false"
              [class.pending]="launch.success === null">
              @if (launch.success === true) {
                Success
              } @else if (launch.success === false) {
                Failed
              } @else {
                Pending
              }
            </span>
          </div>

          <p><strong>Date:</strong> {{ launch.date_utc | date:'MMM d, y, HH:mm' }} UTC</p>

          @if (launch.details) {
            <p class="details">{{ launch.details }}</p>
          }

          @if (launch.links.patch?.small) {
            <div class="patch">
              <img [src]="launch.links.patch?.small" [alt]="(launch.name ?? '') + ' patch'" />
            </div>
          }

          <div class="links">
            @if (launch.links.webcast) {
              <a [href]="launch.links.webcast" target="_blank" class="link">▶ Watch Webcast</a>
            }
            @if (launch.links.youtube_id) {
              <a [href]="'https://youtube.com/watch?v=' + launch.links.youtube_id" target="_blank" class="link">▶ YouTube</a>
            }
            @if (launch.links.article) {
              <a [href]="launch.links.article" target="_blank" class="link">📰 Article</a>
            }
            @if (launch.links.wikipedia) {
              <a [href]="launch.links.wikipedia" target="_blank" class="link">📘 Wikipedia</a>
            }
          </div>
        </div>
      }
    </div>
  }
</div>
  `,
  styles: [
    ]
})
export class ApiDataComponent implements OnInit {
  launches: SpaceXLaunch[] = [];
  loading = true;
  error: string | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getLaunches().subscribe({
      next: (data) => {
        // Sort by most recent first
        this.launches = data
          .sort((a, b) => new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime())
          .slice(0, 12); // Show latest 12 launches
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load SpaceX launch data. Please try again later.';
        this.loading = false;
        console.error('API Error:', err);
      }
    });
  }
}