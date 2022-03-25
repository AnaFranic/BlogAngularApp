import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, Observable, share, switchMap } from 'rxjs';
import { Blog } from '../blogs-list/blogs-list.models';
import { BlogsService } from '../blogs-list/blogs.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {
  blog$: Observable<Blog | undefined> | undefined;

  constructor(private route: ActivatedRoute, private blogsService: BlogsService) { }

  ngOnInit(): void {
    this.blog$ = this.route.paramMap.pipe(
      map(paramMap => Number(paramMap.get('id'))),
      distinctUntilChanged(),
      switchMap(blogId => this.blogsService.getBlog(blogId)),
      share(),
    );
  }
}
