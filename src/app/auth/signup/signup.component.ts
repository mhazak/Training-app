import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  	constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

	isLoading$: Observable<boolean>;

  	ngOnInit(): void {
		this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  	}

	onSubmit(form: NgForm) {
		this.authService.registerUser({
			email: form.value.email,
			password: form.value.password
		});
  	}
}
