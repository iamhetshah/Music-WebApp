import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private baseUrl = 'http://127.0.0.1:8000/api/';
  // private baseUrl = 'api/';
  isAuthenticated = false;
  previousQuery = '';
  constructor(private http: HttpClient) {
    if (getCookie('token') !== '') {
      this.isAuthenticated = true;
    }
    function getCookie(cname: string) {
      let name = cname + '=';
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    }
  }
  getSuggestions(query: string) {
    return this.http.get(this.baseUrl + 'suggestions', {
      params: new HttpParams()
        .set('query', query)
        .set('previous_query', this.previousQuery),
    });
  }

  getSearchResults(query: string) {
    this.previousQuery = query;
    return this.http.get(this.baseUrl + 'search', {
      params: new HttpParams().set('query', query),
    });
  }

  getHome() {
    return this.http.get(this.baseUrl + 'home');
  }

  getPlaybackURL(id: string) {
    return this.http.get(this.baseUrl + 'playbackURL', {
      params: new HttpParams().set('id', id),
    });
  }
}
