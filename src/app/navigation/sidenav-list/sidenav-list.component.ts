import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

import { Observable, Subscription } from 'rxjs';

import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

	@Output() close = new EventEmitter<void>();
	isLogged$: Observable<boolean>;
	subscription!: Subscription

	constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

	ngOnInit(): void {
		this.isLogged$ = this.store.select(fromRoot.getIsAuth);
	}

	onLogout () {
		this.authService.logout();
		this.onClose();
	}

	onClose() {
		this.close.emit();
	}

}
