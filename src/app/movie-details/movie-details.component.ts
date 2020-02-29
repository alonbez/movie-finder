import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @ViewChild('main') mainElement: ElementRef;

  @Input() movie: any;

  @Output() close: EventEmitter<any> = new EventEmitter();

  imdbRef = 'https://www.imdb.com/title/';

  constructor() {
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.mainElement.nativeElement.contains(event.target)) {
      this.close.emit();
    }
  }

  ngOnInit(): void {
  }

}
