import { Component, OnInit } from '@angular/core';
import { delay, distinctUntilChanged, fromEvent, map, Observable, of, share, startWith } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  shouldAnimate$: Observable<boolean> | undefined;
  stickyHeader$: Observable<boolean> | undefined;

  constructor() { }

  ngOnInit(): void {
    this.shouldAnimate$ = of(true).pipe(
      startWith(false),
      delay(50),
    );
    this.stickyHeader$ = fromEvent(window, 'scroll').pipe(
      startWith(window.scrollY > 0),
      map(() => window.scrollY > 0),
      distinctUntilChanged(),
      share(),
    );
  }
}
