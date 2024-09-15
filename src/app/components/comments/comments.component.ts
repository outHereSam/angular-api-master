import { Component, Input } from '@angular/core';
import { Comment } from '../../interfaces/IComment';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.sass',
})
export class CommentsComponent {
  @Input() postId: number = 0;
  comments$: Observable<Comment[]>;

  constructor(private apiService: ApiService) {
    this.comments$ = this.apiService.getCommentsByPostId(this.postId);
  }

  ngOnInit() {
    this.comments$ = this.apiService.getCommentsByPostId(this.postId);
  }
}
