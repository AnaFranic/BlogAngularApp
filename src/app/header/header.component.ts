import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  animate = false;
  stickyHeader = false;

  private subscriptions = new Subscription();

  constructor() { }

  ngOnInit(): void {
    this.stickyHeader = window.scrollY > 0;
    this.subscriptions.add(
      fromEvent(window, 'scroll').subscribe(() => {
        this.stickyHeader = window.scrollY > 0;
      })
    );
    window.setTimeout(() => {
      this.animate = true;
    }, 50);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
