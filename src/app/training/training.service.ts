import { Exercise } from "./exercise.model";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";

@Injectable()
export class TrainingService {
	constructor (private db: AngularFirestore) {}

	private availableExercises: Exercise[] = [
		{ id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
		{ id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
		{ id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
		{ id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
	];

	exerciseStarted = new Subject<Exercise | null>();
	exerciseChanged = new Subject<Exercise[]>();

	private completedExercises: Exercise[] = [];
	private runningExercise!: Exercise | null;

	fetchExercises() {
		this.db
			.collection('availableExercises')
			.snapshotChanges()
			.pipe(
				map(docData => {
					return docData.map(doc => {
						return {
							id: doc.payload.doc.id,
							name: doc.payload.doc.data()['name'],
							duration: doc.payload.doc.data()['duration'],
							calories: doc.payload.doc.data()['calories'],
						}
					})
				})
			).subscribe((result: Exercise[]) => {
				this.availableExercises = result;
				this.exerciseChanged.next(result);
			})
	}

	startExercise(exerciseId: string) {
		const selectedExercise = this.availableExercises.find(x => x.id === exerciseId);
		if (selectedExercise) {
			this.runningExercise = selectedExercise;
			this.exerciseStarted.next(selectedExercise);
		}
	}

	completedExercise() {
		if (this.runningExercise)
			this.finishedExercises({...this.runningExercise, date: new Date, state: 'completed' });
		this.runningExercise = null;
		this.exerciseStarted.next(null);
	}

	cancelledExercise(progress: number) {
		if (this.runningExercise)
			this.finishedExercises({...this.runningExercise, duration: this.runningExercise.duration * (progress / 100), calories: this.runningExercise.calories * (progress / 100), date: new Date, state: 'cancelled' });
		this.runningExercise = null;
		this.exerciseStarted.next(null);
	}

	getRunningExercise() {
		return this.runningExercise;
	}

	getExerciseHistory () {
		return this.completedExercises.slice();
	}

	private finishedExercises(exercise: Exercise) {
		this.db.collection('finishedExercises').add(exercise);
	}
}
