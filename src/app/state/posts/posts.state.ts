import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Post } from '../../interfaces/IPost';

export interface PostState extends EntityState<Post> {
  posts: Post[];
  error: string | null;
  loading: boolean;
}

export const postAdapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  selectId: (post: Post) => post.id,
  sortComparer: (a: Post, b: Post) => b.id - a.id,
});

export const initialPostState: PostState = postAdapter.getInitialState({
  posts: [],
  error: null,
  loading: false,
});
