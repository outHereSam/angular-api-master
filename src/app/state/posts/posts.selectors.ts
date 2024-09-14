import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PostState, postAdapter } from './posts.state';

export const selectPostState = createFeatureSelector<PostState>('posts');

// Selectors for posts
export const {
  selectAll: selectAllPosts,
  selectEntities: selectPostEntities,
  selectIds: selectPostIds,
  selectTotal: selectTotalPosts,
} = postAdapter.getSelectors(selectPostState);

// Select a single post
export const selectPostById = (id: number) =>
  createSelector(selectPostEntities, (entities) => entities[id]);

// Select post loading
export const selectPostLoading = createSelector(
  selectPostState,
  (state: PostState) => state.loading
);

// Select post error
export const selectPostError = createSelector(
  selectPostState,
  (state: PostState) => state.error
);
