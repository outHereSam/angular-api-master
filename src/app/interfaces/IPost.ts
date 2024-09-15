import { Comment } from './IComment';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments?: Comment[];
}
