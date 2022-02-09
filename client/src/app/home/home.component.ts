import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor() { }

  ngOnInit(): void {
  }

  registerToggle() { //Display form to registry new user
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) { //Cancel registering and hide again registry form. Receiving boolean from child component (register.component)
    this.registerMode = event;
  }

}
