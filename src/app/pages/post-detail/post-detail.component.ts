import { Component, inject } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Post } from '../../interfaces/IPost';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { AsyncPipe } from '@angular/common';
import { CommentsComponent } from '../../components/comments/comments.component';
import { FormModalComponent } from '../../components/form-modal/form-modal.component';
import { ModalService } from '../../services/modal.service';
import { deletePost } from '../../state/posts/posts.actions';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    PostCardComponent,
    RouterLink,
    AsyncPipe,
    CommentsComponent,
    FormModalComponent,
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.sass',
})
export class PostDetailComponent {
  modalService: ModalService = inject(ModalService);
  apiService: ApiService = inject(ApiService);
  post$: Observable<Post>;
  postId: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.postId = Number(params.get('id'));
        return this.apiService.getPostById(this.postId);
      })
    );
  }

  deletePost(id: number) {
    this.apiService.deletePost(id);
    this.router.navigate(['']);
  }
}
