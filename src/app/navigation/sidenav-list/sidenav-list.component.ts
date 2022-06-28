import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

	@Output() close = new EventEmitter<void>();
	isLogged!: boolean;
	subscription!: Subscription
	constructor(private authService: AuthService) { }

	ngOnInit(): void {
		this.subscription = this.authService.authChange.subscribe((isLogged: boolean) => {
			this.isLogged = isLogged;
		});
	}

	onLogout () {
		this.authService.logout();
		this.onClose();
	}

	ngOnDestroy() {
		if (this.subscription)
			this.subscription.unsubscribe();
	}

	onClose() {
		this.close.emit();
	}

}
