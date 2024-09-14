import { Component } from '@angular/core';
import { PostListComponent } from '../../components/post-list/post-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {}
