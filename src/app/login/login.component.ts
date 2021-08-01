import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password:  new FormControl('', [Validators.required])
  });
  dataValue: any;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private apiServiceService: ApiServiceService
  ) {
     
  }

  ngOnInit() {

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.dataValue = [];
      this.submitted = true;
      let loopStop: boolean = false;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      this.apiServiceService.getUserData('posts').subscribe((res)=>{
        this.dataValue = res;
        let localStorageValue = localStorage.getItem('dataValue');
        if(localStorageValue !== null) {
          let parseJson = JSON.parse(localStorageValue);
          this.dataValue.push(parseJson);
          localStorage.setItem('dataValue', JSON.stringify(this.dataValue));
          this.dataValue.forEach((element: any) => {
            if(!loopStop && element.name === this.loginForm.controls.username.value && element.password === this.loginForm.controls.password.value) {
              loopStop = true;
            }
          });
          if(loopStop) {
            this.router.navigateByUrl('/home');
          } else {
            console.log("failed")
          }
        }else {
          this.dataValue.forEach((element: any) => {
            if(!loopStop && element.name === this.loginForm.controls.username.value && element.password === this.loginForm.controls.password.value) {
              loopStop = true;
            }
          });
          if(loopStop) {
            this.router.navigateByUrl('/home');
          } else {
            console.log("failed")
          }
        }
      });
      this.loading = true;
  }
}
