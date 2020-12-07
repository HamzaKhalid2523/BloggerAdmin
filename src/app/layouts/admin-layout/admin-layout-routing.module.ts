import { Routes } from '@angular/router';
import { AddBlogComponent } from 'src/app/components/add-blog/add-blog.component';
import { BlogPostsComponent } from 'src/app/components/blog-posts/blog-posts.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { UserProfileComponent } from 'src/app/components/user-profile/user-profile.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard',
    },
  },
  {
    path: 'add-blog',
    component: AddBlogComponent,
    data: {
      title: 'AddBlog',
    },
  },
  {
    path: 'blog-posts',
    component: BlogPostsComponent,
    data: {
      title: 'BlogPosts',
    },
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    data: {
      title: 'Profile',
    },
  },
];
