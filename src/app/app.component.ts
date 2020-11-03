import { Component } from '@angular/core';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private service: PostsService) { }

  onSubmit() {
    let postData = {
      title: "Some title",
      content: "content"
    };

    this.service.createPost(postData);
  }

  onFetch() {
    this.service.fetchPost().subscribe(
      posts => console.log(posts),
      err => console.log(err.message));
  }

  onClear() {
    this.service.deletePost().subscribe(() => console.log());
  }
}
