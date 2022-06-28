import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private uiservice: UIService) { }

  isLoading = false;
  loadingSubscription: Subscription;

  ngOnInit(): void {
	this.loadingSubscription = this.uiservice.loadingStateChange.subscribe(isLoading => {
		this.isLoading = isLoading;
	})
  }

  ngOnDestroy() {
	  this.loadingSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
	this.authService.registerUser({
		email: form.value.email,
		password: form.value.password
	});
  }
}
