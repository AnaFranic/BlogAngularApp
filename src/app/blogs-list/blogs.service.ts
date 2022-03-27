import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Blog } from './blogs-list.models';
import { getInitialBlogs } from './blogs.service.helpers';

@Injectable()
export class BlogsService {
  private blogs = getInitialBlogs();

  constructor() { }

  getBlog(id: number): Observable<Blog | undefined> {
    const blog = this.blogs.find(b => b.id === id);
    return of(blog).pipe(delay(50));
  }

  getBlogs(): Observable<Blog[]> {
    return of(this.blogs).pipe(delay(50));
  }

  createBlog(blog: Blog): Observable<Blog> {
    const maxId = this.blogs.reduce((agg, curr) => agg < curr.id ? curr.id : agg, -1);
    const newId = maxId + 1;
    const blogCopy: Blog = {
      ...blog,
      id: newId,
    };
    this.blogs = [...this.blogs, blogCopy];
    return of(blogCopy).pipe(delay(50));
  }

  updateBlog(blog: Blog): Observable<Blog> {
    const index = this.blogs.findIndex(b => b.id === blog.id);
    if (index === -1) {
      throw new Error(`Can\'t find blog with id ${blog.id}`);
    }
    this.blogs = [...this.blogs.slice(0, index), blog, ...this.blogs.slice(index + 1)];
    return of(blog).pipe(delay(50));
  }

  deleteBlog(blog: Blog): Observable<Blog[]> {
    this.blogs = this.blogs.filter(b => blog.id !== b.id)
    return of(this.blogs).pipe(delay(50));
  }
}
