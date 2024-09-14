import { Component } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Post } from '../../interfaces/IPost';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.sass',
})
export class PostDetailComponent {
  post$: Observable<any>;
  postId: string | null = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.postId = params.get('id');
        return this.apiService.getPostById(this.postId);
      })
    );
    this.post$.subscribe((post) => console.log(post));
  }
}
