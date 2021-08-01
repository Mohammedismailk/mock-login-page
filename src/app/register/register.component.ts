import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  loading = false;
  submitted = false;
  constructor(      
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiServiceService: ApiServiceService) {

  }

  get f() { return this.registerForm.controls; } 

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    let loopStop: boolean = false;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    let userData = {
      firstName: this.f.firstName.value,
      lastname: this.f.lastName.value,
      name: this.f.username.value,
      password: this.f.password.value

    }
    let localStorageValue: any = localStorage.getItem('dataValue');
    if(localStorageValue !== null) {
      let dataValue = JSON.parse(localStorageValue);
      dataValue.push(userData);
      localStorage.setItem('dataValue', JSON.stringify(dataValue));
    } else {
      localStorage.setItem('dataValue', JSON.stringify(userData));
    }
    this.router.navigateByUrl('/login');
    this.loading = true;
  }
}
