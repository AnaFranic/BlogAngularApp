import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Blog } from './blogs-list.models';

@Injectable()
export class BlogsService {
  private blogs: Blog[] = [
    {
      id: 0,
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus sem eget auctor venenatis. In dictum cursus nibh nec sagittis.',
      image: './assets/img/blog-logo.png',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elementum dictum velit, a fringilla felis gravida quis. Sed facilisis commodo lectus, quis pharetra dolor eleifend vel. Curabitur in sem dictum, egestas magna imperdiet, rhoncus sapien. Nam lacinia molestie quam, in feugiat urna mattis et. Nulla eu vestibulum elit, ut vehicula lacus. Aenean risus augue, efficitur id ex sed, sodales mattis eros. Proin congue tristique porttitor. Nulla fringilla dapibus ante, eget tincidunt lacus cursus et. Phasellus ac commodo nunc, id luctus dui. Nulla porta non orci in posuere. Curabitur non quam condimentum, convallis ante et, consequat justo. Sed eget cursus nisl.',
      date: '1/3/2022',
    },
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus sem eget auctor venenatis. In dictum cursus nibh nec sagittis.',
      image: './assets/img/blog-logo.png',
      content: 'Curabitur ex nisl, laoreet vel lacinia non, semper et augue. Suspendisse vel eros quis lectus imperdiet condimentum eu ac turpis. Ut vitae iaculis nisi. Sed vitae eros eget urna suscipit faucibus faucibus vel velit. Sed non dui consequat, commodo ante sed, ornare lectus. Vestibulum volutpat nisl quis suscipit porttitor. Integer et iaculis metus, vel convallis nisi. Phasellus id arcu finibus, auctor nisl tempor, viverra nisl. Integer lobortis sem justo, et laoreet nibh gravida et. Curabitur et arcu nunc.',
      date: '2/3/2022',
    }
  ];

  constructor() { }

  getBlog(id: number): Observable<Blog | undefined> {
    const blog = this.blogs.find(b => b.id === id);
    return of(blog).pipe(delay(200));
  }

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
