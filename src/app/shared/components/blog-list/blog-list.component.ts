import { Component, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, map, Observable, share, Subscription, switchMap } from 'rxjs';
import { EditBlogComponent } from '../edit-blog/edit-blog.component';
import { EditBlogDialogData, EditBlogDialogResult } from '../edit-blog/edit-blog.models';
import { Blog } from '../../models/blog.models';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit, OnDestroy {
  @Input() allowEdit = false;
  @Input() maxItems = 100;

  blogs$: Observable<Blog[] | undefined> | undefined;

  private refresh$ = new BehaviorSubject<void>(undefined);
  private subscriptions = new Subscription();

  constructor(
    private blogService: BlogService,
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit(): void {
    this.blogs$ = this.refresh$.pipe(
      switchMap(() => this.blogService.getBlogs()),
      map(blogs => blogs.sort((blog1, blog2) => {
        const date1 = new Date(blog1.date).toISOString();
        const date2 = new Date(blog2.date).toISOString();
        return date1.localeCompare(date2);
      })),
      share(),
    );
  }

  ngOnDestroy(): void {
    this.refresh$.complete();
    this.subscriptions.unsubscribe();
  }

  trackBlogs(index: number, blog: Blog): number {
    return blog.id;
  }

  createBlog(): void {
    this.editBlog();
  }

  editBlog(blog?: Blog): void {
    const data: EditBlogDialogData = {
      blog,
    };
    const dialogRef = this.dialog.open(EditBlogComponent, {
      data,
      autoFocus: false,
      viewContainerRef: this.viewContainerRef,
      width: '600px',
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((result?: EditBlogDialogResult) => {
        if (result?.refresh) this.refresh$.next();
      }),
    );
  }

  deleteBlog(blog: Blog): void {
    this.subscriptions.add(
      this.blogService.deleteBlog(blog).subscribe(() => this.refresh$.next()),
    );
  }
}
