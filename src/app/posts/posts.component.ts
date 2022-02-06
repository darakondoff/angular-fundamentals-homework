import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe((posts) => (this.posts = posts));
  }

  add(title: string): void {
    title = title.trim();
    if (!title) {
      return;
    }
    this.postService.addPost({ title } as Post).subscribe((post) => {
      this.posts.push(post);
    });
  }

  // showPostDetails = () => {
  //   this.router.navigateByUrl('./details/:id');
  // };

  delete(post: Post): void {
    this.posts = this.posts.filter((p) => p !== post);
    this.postService.deletePost(post.id).subscribe();
  }
}