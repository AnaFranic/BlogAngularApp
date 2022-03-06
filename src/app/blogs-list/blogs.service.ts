import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Blog } from './blogs-list.models';

@Injectable()
export class BlogsService {
  private blogs: Blog[] = [
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

  getBlogs(): Observable<Blog[]> {
    return of(this.blogs).pipe(delay(5000));
  }
}

