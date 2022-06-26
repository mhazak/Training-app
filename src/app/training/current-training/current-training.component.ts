import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

import { Subscription } from 'rxjs';

import { StopTrainingComponent } from './stop-training/stop-training.component';
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
	constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

	interval: any;
	progress = 0;
	status = 'Keep going!';
	selectedExercise!: Exercise;

	subscription!: Subscription;

	@Output() trainingExit = new EventEmitter<void>();

	ngOnInit(): void {
		this.startOrContinue();
	}

	startOrContinue() {
		// duration of training devided by 100 (percent) multiple by 1000 (ms)
		const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
		this.interval = setInterval(() => {
			this.progress += 1;
			if (this.progress >= 100) {
				this.status = 'Your workout is done. Well done!';
				clearInterval(this.interval);
				return;
			}
		}, step);
	}

	stopTraining () {
		clearInterval(this.interval);
		const dialogResult = this.dialog.open(StopTrainingComponent, { data: {
			progress: this.progress
		}});

		dialogResult.afterClosed().subscribe(result => {
			if (result) {
				this.trainingExit.emit();
				return;
			}

			this.startOrContinue();
		});

	}

}
