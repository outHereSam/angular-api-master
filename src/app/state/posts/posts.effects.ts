import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import * as PostActions from './posts.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

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
          map((posts) => {
            return PostActions.loadPostsSuccess({ posts });
          })
        );
      }),
      catchError((error) =>
        of(PostActions.loadPostsFailure({ error: error.message }))
      )
    )
  );
}
