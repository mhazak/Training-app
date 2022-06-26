import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

	@Output() close = new EventEmitter<void>();
	constructor() { }

	ngOnInit(): void {
	}

	onClose() {
		this.close.emit();
	}

}
