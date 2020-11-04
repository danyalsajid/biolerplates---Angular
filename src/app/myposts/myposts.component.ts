import { Component } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent {

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
