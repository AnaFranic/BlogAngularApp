import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Blog } from './blogs-list.models';
import { BlogsService } from './blogs.service';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss']
})
export class BlogsListComponent implements OnInit, OnDestroy {

  blogs?: Blog[];

  private subscriptions = new Subscription();

  constructor(private blogsService: BlogsService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.blogsService.getBlogs().subscribe((blogs) => {
        this.blogs = blogs;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
