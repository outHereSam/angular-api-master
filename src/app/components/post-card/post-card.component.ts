import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/IPost';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { Comment } from '../../interfaces/IComment';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.sass',
})
export class PostCardComponent {
  @Input() post: Post = {
    userId: 1,
    id: 1,
    title: '',
    body: '',
  };
  commentCount: number = 0;
  comments$: Observable<Comment[]>;

  constructor(private apiService: ApiService) {
    this.comments$ = this.apiService.getCommentsByPostId(this.post.userId);
  }
}
