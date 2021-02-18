import { Component } from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mySubscription: Subscription;
  countDownDate: any;
  now = '';
  distance = '';
  days = '';
  hours = '';
  minutes = '';
  seconds = '';
  formdata: any;


items = []; // define list of pending items
  comItems = []; // define list of completed items

  ngOnInit() {

    this.formdata = new FormGroup({
      date: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),
      hours: new FormControl(''),
      min: new FormControl(''),
      sec: new FormControl(''),
    });

  }

  k = function(){

    setTimeout (() => {
      this.now = new Date().getTime();
      this.distance = this.countDownDate - this.now;

      this.days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
    }, 1000);

  };

  onClickSubmit(data) {
    this.countDownDate = new Date('OCT 17 , 2021 00:00:00');
    this.countDownDate.setDate(Number('17'));
    this.countDownDate.setFullYear(Number('2021'));
    this.countDownDate.setHours(Number('00'));
    this.countDownDate.setMinutes(Number('00'));
    this.countDownDate.setSeconds(Number('00'));
    this.countDownDate.setMonth(Number('10'));

    this.countDownDate = this.countDownDate.getTime();

    this.mySubscription = interval(1000).subscribe((x => {
      this.k();
    }));
  }

  // code to push new item
  submitNewItem(event) {
    const index: number = this.items.indexOf(event.taskName);
    if (index !== -1) {
      alert('Item already exists');
    } else {
      this.items.push(event.taskName);
    }
  }

  // code to complete item and push it into complete item list
  completeItem(item: string) {
    const index: number = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.comItems.push(item);
    }
  }

  // code to delete item either from completed or pending items list
  deleteItem(item: string) {
    let index: number = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    } else {
      index = this.comItems.indexOf(item);
      if (index !== -1) {
        this.comItems.splice(index, 1);
      }
    }
  }

}
