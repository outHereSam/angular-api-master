import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../interfaces/IPost';
import { AsyncPipe } from '@angular/common';
import { PostCardComponent } from '../post-card/post-card.component';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import {
  selectAllPosts,
  selectPostError,
  selectPostLoading,
} from '../../state/posts/posts.selectors';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink, PostCardComponent, HeaderComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.sass',
})
export class PostListComponent {
  posts$: Observable<Post[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.posts$ = this.store.select(selectAllPosts);
    this.loading$ = this.store.select(selectPostLoading);
    this.error$ = this.store.select(selectPostError);
  }
}
