import { createAction, props } from '@ngrx/store';
import { Post } from '../../interfaces/IPost';
import { PostData } from '../../interfaces/IPostData';

// Load Actions
export const loadPosts = createAction('[Post List] Load Posts');
export const loadPostsSuccess = createAction(
  '[Post List] Load Posts Success',
  props<{ posts: Post[] }>()
);
export const loadPostsFailure = createAction(
  '[Post List] Load Posts Failure',
  props<{ error: string }>()
);
export const addPostSuccess = createAction('[Post List] Add Post Success');

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
