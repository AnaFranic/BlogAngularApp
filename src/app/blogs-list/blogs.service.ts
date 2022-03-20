import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Blog } from './blogs-list.models';

@Injectable()
export class BlogsService {
  private blogs: Blog[] = [
    {
      id: 0,
      title: 'Representation Matters: Inaugural Chubby Diaries Travel Awards',
      subtitle: 'Representation Matters: Inaugural Chubby Diaries Travel Awards Chubby Diaries is happy to announce that we are presenting the first ever Inaugural Chubby Diaries Travel Awards, the',
      image: './assets/img/blog-logo.png',
      date: '1/3/2022'
    },
    {
      id: 1,
      title: 'Representation Matters: Inaugural Chubby Diaries Travel Awards',
      subtitle: 'Representation Matters: Inaugural Chubby Diaries Travel Awards Chubby Diaries is happy to announce that we are presenting the first ever Inaugural Chubby Diaries Travel Awards, the',
      image: './assets/img/blog-logo.png',
      date: '2/3/2022'
    }
  ];

  constructor() { }

  getBlogs(): Observable<Blog[]> {
    return of(this.blogs).pipe(delay(200));
  }

  createBlog(blog: Blog): Observable<Blog> {
    const maxId = this.blogs.reduce((agg, curr) => agg < curr.id ? curr.id : agg, -1);
    const newId = maxId + 1;
    const blogCopy: Blog = {
      ...blog,
      id: newId,
    };
    this.blogs = [...this.blogs, blogCopy];
    return of(blogCopy).pipe(delay(200));
  }

  updateBlog(blog: Blog): Observable<Blog> {
    const index = this.blogs.findIndex(b => b.id === blog.id);
    if (index === -1) {
      throw new Error(`Can\'t find blog with id ${blog.id}`);
    }
    this.blogs = [...this.blogs.slice(0, index), blog, ...this.blogs.slice(index + 1)];
    return of(blog).pipe(delay(200));
  }

  deleteBlog(blog: Blog): Observable<Blog[]> {
    this.blogs = this.blogs.filter(b => blog.id !== b.id)
    return of(this.blogs).pipe(delay(200));
  }
}
