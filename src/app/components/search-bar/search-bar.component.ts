import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server/server.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  suggestions = { result: [] };
  query = '';
  timeout: any = null;
  showSuggestions = false;
  constructor(private server: ServerService, private router: Router) {}

  loadSuggestions() {
    if (this.query.trim() === '') {
      this.suggestions.result = [];
      return;
    }
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.server
        .getSuggestions(this.query.trim())
        .subscribe((responseData: any) => {
          this.suggestions.result = responseData['result'];
        });
    }, 300);
  }

  search(q: string) {
    if (q === undefined || q.length < 1) {
      return;
    }
    this.showSuggestions = false;
    this.router.navigate(['/search'], { queryParams: { query: q } });
  }
}
