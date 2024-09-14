import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/IPost';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectPostById } from '../../state/posts/posts.selectors';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.sass',
})
export class PostCardComponent {
  @Input() postId: number = 0;
  commentCount: number | undefined = 0;
  post$: Observable<Post | undefined>;

  constructor(private store: Store) {
    this.post$ = this.store.select(selectPostById(this.postId));
  }

  ngOnInit() {
    this.post$ = this.store.select(selectPostById(this.postId));
  }

  deletePost(id: number) {}
}
