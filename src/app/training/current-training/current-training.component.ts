import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
	constructor() { }
	interval: any;
	progress = 0;
	status = 'Keep going!';

	ngOnInit(): void {
		this.interval = setInterval(() => {
			this.progress += 5;
			if (this.progress == 100) {
				this.status = 'Your workout is done. Well done!';
				clearInterval(this.interval);
				return;
			}
		}, 1000);
	}

	stopTraining () {
		clearInterval(this.interval);
	}

}
