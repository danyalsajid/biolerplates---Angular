import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text = 'some dummy text';
  date = new Date(2020, 11 , 2);

  filteredStatus = "";
  list = ["item 1", "item 2", "item 2", "item 3"];

  appStatus = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('stable');
    }, 2000);
  })

  addItem() {
    this.list.push('item 1');
  }

}
