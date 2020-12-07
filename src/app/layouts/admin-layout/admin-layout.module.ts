import { QuillModule } from 'ngx-quill';
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout-routing.module";
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { AddBlogComponent } from 'src/app/components/add-blog/add-blog.component';
import { BlogPostsComponent } from 'src/app/components/blog-posts/blog-posts.component';
import { UserProfileComponent } from 'src/app/components/user-profile/user-profile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    QuillModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    AddBlogComponent,
    BlogPostsComponent,
    UserProfileComponent
  ]
})
export class AdminLayoutModule {}
