import { Component, OnInit } from '@angular/core';
import { Blog } from './blogs-list.models';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss']
})
export class BlogsListComponent implements OnInit {

  blogs: Blog[] = [
    {
      title: 'Representation Matters: Inaugural Chubby Diaries Travel Awards',
      subtitle: 'Representation Matters: Inaugural Chubby Diaries Travel Awards Chubby Diaries is happy to announce that we are presenting the first ever Inaugural Chubby Diaries Travel Awards, the',
      image: './assets/img/blog-logo.png',
      date: '1/3/2022'
    },
    {
      title: 'Representation Matters: Inaugural Chubby Diaries Travel Awards',
      subtitle: 'Representation Matters: Inaugural Chubby Diaries Travel Awards Chubby Diaries is happy to announce that we are presenting the first ever Inaugural Chubby Diaries Travel Awards, the',
      image: './assets/img/blog-logo.png',
      date: '2/3/2022'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
