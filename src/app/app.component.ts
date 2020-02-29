import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  results = [];
  error;
  busy = false;
  selected: any;


  private baseUrl = 'http://www.omdbapi.com/?apikey=157f34ed&type=movie&';

  constructor(private httpClient: HttpClient) {
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.selected = undefined;
  }

  onSearch(input: string) {
    this.error = undefined;
    this.selected = undefined;

    if (this.isIlligalInput(input)) {
      this.error = 'Try again';
      return;
    }

    input = '*' + input.replace(/\s+/g, '*') + '*';

    this.results = [];
    this.busy = true;
    this.httpClient.get(this.baseUrl + `s=${input}`).pipe(
      catchError(e => of(this.handleError(e)))
    ).subscribe((res: any) => {
      if (res) {
        if (res.Response === 'True') {
          this.results = res.Search;
        } else {
          this.error = res.Error;
        }
      }

      this.busy = false;
    });
  }

  onSelect(movie: any) {
    this.busy = true;
    this.error = undefined;
    this.selected = undefined;

    if (movie.imdbID) {
      this.httpClient.get(this.baseUrl + `i=${movie.imdbID}`).subscribe((res: any) => {
        if (res) {
          if (res.Response === 'True') {
            this.selected = res;
          } else {
            this.error = res.Error;
          }
        }

        this.busy = false;
      });
    } else {
      this.error = 'No such ID!';
    }

  }

  private handleError(e: any) {
    this.error = 'Something went wrong, please try again';
  }

  private isIlligalInput(input: string): boolean {
    return input.replace(/\s+/g, '') === '';
  }
}
