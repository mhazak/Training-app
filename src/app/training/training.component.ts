import { Component, OnDestroy, OnInit } from '@angular/core';
import { Exercise } from './exercise.model';
import { TrainingService } from './training.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
	ongoingTraining = false;
	subscription!: Subscription;
	runningExercise!: Exercise | null;

  	constructor(private trainingService: TrainingService) { }

  	ngOnInit(): void {
		this.subscription = this.trainingService.exerciseStarted.subscribe((exercise: Exercise | null) => {
			if (exercise) {
				this.ongoingTraining = true;
				this.runningExercise = exercise;
			} else {
				this.ongoingTraining = false;
				this.runningExercise = null;
			}
		});
  	}

	ngOnDestroy () {
		if (this.subscription)
			this.subscription.unsubscribe();
	}

}
