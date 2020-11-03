import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  createPost(postData: { title: string, content: string }) {
    this.http.post<{ name: string }>(
      'https://ng-course-recipe-book-5fceb.firebaseio.com/posts.json',
      postData).subscribe(response => {
        console.log(response);
      });
  }

  fetchPost() {
    return this.http
      .get<{ [key: string]: { title: string, constent: string, id?: string } }>('https://ng-course-recipe-book-5fceb.firebaseio.com/posts.json',
        { // optional parts
          headers: new HttpHeaders({ "Custom-Header": "Hello" }),
          params: new HttpParams().set('print', 'pretty'),
          responseType: 'json'
        })
      .pipe(
        map((res) => {
          const postArray: { title: string, constent: string, id?: string }[] = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              postArray.push({ ...res[key], id: key })
            }
          }
          return postArray;
        })
      );
  }

  deletePost() {
    // deletes all the posts, can delete specific posts by providing its id
    return this.http.delete('https://ng-course-recipe-book-5fceb.firebaseio.com/posts.json')
  }
}
