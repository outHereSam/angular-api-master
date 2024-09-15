import { Component } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Post } from '../../interfaces/IPost';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [PostCardComponent, RouterLink, AsyncPipe],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.sass',
})
export class PostDetailComponent {
  post$: Observable<any>;
  postId: number = 0;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.postId = Number(params.get('id'));
        return this.apiService.getPostById(this.postId);
      })
    );
    this.post$.subscribe((post) => console.log(post));
  }
}
