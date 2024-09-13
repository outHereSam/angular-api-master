import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { Post } from '../../interfaces/IPost';
import { AsyncPipe } from '@angular/common';
import { PostCardComponent } from '../../components/post-card/post-card.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [AsyncPipe, PostCardComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.sass',
})
export class PostListComponent {
  posts$: Observable<Post[]>;

  constructor(private apiService: ApiService) {
    this.posts$ = this.apiService.getPosts();
  }
}
