import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame:boolean=false;
  email:string = "";
  auth2:any;

  constructor() { }

  ngOnInit(): void {
  }

  ingresar(forma: NgForm) {

  }

}
