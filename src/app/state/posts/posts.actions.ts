import { createAction, props } from '@ngrx/store';
import { Post } from '../../interfaces/IPost';

// Load Actions
export const loadPosts = createAction('[Post] Load Posts');
export const loadPostsSuccess = createAction(
  '[Post] Load Posts Success',
  props<{ posts: Post[] }>()
);
export const loadPostsFailure = createAction(
  '[Post] Load Posts Failure',
  props<{ error: string }>()
);
export const addPostSuccess = createAction('[Post] Add Post Success');

// Add post action
export const addPost = createAction('[Post] Add Post', props<{ post: Post }>());

// Update post action
export const updatePost = createAction(
  '[Post] Update Post',
  props<{ post: Partial<Post> & { id: number } }>()
);

// Delete post action
export const deletePost = createAction(
  '[Post] Delete Post',
  props<{ id: number }>()
);
