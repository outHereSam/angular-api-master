import { createReducer, on } from '@ngrx/store';
import * as PostActions from './posts.actions';
import { initialPostState, postAdapter } from './posts.state';

export const postReducer = createReducer(
  initialPostState,
  on(PostActions.loadPosts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PostActions.loadPostsSuccess, (state, { posts }) =>
    postAdapter.setAll(posts, { ...state, loading: false, error: null })
  ),
  on(PostActions.loadPostsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(PostActions.addPost, (state, { post }) => postAdapter.addOne(post, state)),
  on(PostActions.updatePost, (state, { post }) =>
    postAdapter.updateOne({ id: post.id, changes: post }, state)
  ),
  on(PostActions.deletePost, (state, { id }) =>
    postAdapter.removeOne(id, state)
  )
);
