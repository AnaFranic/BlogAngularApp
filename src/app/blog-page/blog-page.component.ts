import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Blog } from '../blogs-list/blogs-list.models';
import { BlogsService } from '../blogs-list/blogs.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit, OnDestroy {

  blog?: Blog;

  private subscriptions = new Subscription();

  private blogId = Number(this.route.snapshot.paramMap.get('id'));

  constructor(
    private route: ActivatedRoute,
    private blogsService: BlogsService,
  ) { }

  ngOnInit(): void {
    this.getBlog(this.blogId);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getBlog(blogId: number): void {
    this.subscriptions.add(
      this.blogsService.getBlog(blogId).subscribe((blog) => {
        this.blog = blog;
      })
    );
  }
}
