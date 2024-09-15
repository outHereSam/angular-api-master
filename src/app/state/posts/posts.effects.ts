import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import * as PostActions from './posts.actions';
import { catchError, forkJoin, map, mergeMap, of } from 'rxjs';
import { Post } from '../../interfaces/IPost';

@Injectable()
export class PostEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store
  ) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPosts),
      mergeMap(() => {
        return this.apiService.getPosts().pipe(
          mergeMap((posts: Post[]) =>
            forkJoin(posts.map((post) => this.apiService.getPostById(post.id)))
          ),
          map((postsWithComments: Post[]) => {
            return PostActions.loadPostsSuccess({ posts: postsWithComments });
          })
        );
      }),
      catchError((error) =>
        of(PostActions.loadPostsFailure({ error: error.message }))
      )
    )
  );
}
