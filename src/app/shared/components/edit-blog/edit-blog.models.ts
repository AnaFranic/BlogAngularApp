import { Blog } from '../../models/blog.models';

export interface EditBlogDialogData {
  blog?: Blog;
}

export interface EditBlogDialogResult {
  refresh: boolean;
}
