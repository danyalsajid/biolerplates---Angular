import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

interface PostData {
  title: string;
  content: string;
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  createPost(postData: PostData) {
    this.http
      .post<{ name: string }>(
        'https://ng-course-recipe-book-5fceb.firebaseio.com/posts.json',
        postData
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchPost() {

    return this.http.get<{ [key: string]: PostData }>('https://ng-course-recipe-book-5fceb.firebaseio.com/posts.json')
      .pipe(
        map((res) => {
          const postArray: PostData[] = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              postArray.push({ ...res[key], id: key });
            }
          }
          return postArray;
        })
      );
  }

  deletePost() {
    // deletes all the posts, can delete specific posts by providing its id
    return this.http.delete(
      'https://ng-course-recipe-book-5fceb.firebaseio.com/posts.json'
    );
  }
}
