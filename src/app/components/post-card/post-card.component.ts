import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/IPost';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.sass',
})
export class PostCardComponent {
  @Input() post: Post = {
    userId: '',
    id: '',
    title: '',
    body: '',
  };
}
