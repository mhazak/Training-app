import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})

export class NewTrainingComponent implements OnInit, OnDestroy {

	@ViewChild('selectedExercise') selectedExercise!: any;
	@Output() trainingStarts = new EventEmitter<void>();
	exercises!: Exercise[];
	subscription: Subscription;
	isLoading = true;
	loadingSubscription: Subscription;

	constructor(private trainingService: TrainingService, private uiservice: UIService) { }

  	ngOnInit(): void {
		this.subscription = this.trainingService.exerciseChanged.subscribe((result: Exercise[]) => {
			this.exercises = result;
		});
		this.loadingSubscription = this.uiservice.loadingStateChange.subscribe(isLoading => this.isLoading = isLoading);
		this.fetchExercises();
  	}

	fetchExercises() {
		this.trainingService.fetchExercises();
	}

	ngOnDestroy () {
		if (this.subscription)
			this.subscription.unsubscribe();
		if (this.loadingSubscription)
			this.loadingSubscription.unsubscribe();
	}

	startTraining (form: NgForm) {
		this.trainingService.startExercise(form.value.selectedExercise);
	}

}
