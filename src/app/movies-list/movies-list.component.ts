import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  @Input() movies = [];

  @Output() select: EventEmitter<any> = new EventEmitter();

  moviesOrder = [8, 6, 4, 2, 0, 1, 3, 5, 7];

  constructor() {
  }

  ngOnInit(): void {
  }

}
