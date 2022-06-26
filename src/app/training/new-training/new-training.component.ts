import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

	@Output() trainingStarts = new EventEmitter<void>();
	exercises!: Exercise[];

	constructor(private trainingService: TrainingService) { }

  	ngOnInit(): void {
		this.exercises = this.trainingService.getExercises();
  	}

	toggleCurrentTraining () {
		this.trainingStarts.emit()
	}

}
