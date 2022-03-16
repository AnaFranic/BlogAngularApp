import { Blog } from '../blogs-list/blogs-list.models';

export interface EditBlogDialogData {
  blog: Blog;
}

export interface EditBlogDialogResult {
  refresh: boolean;
}
