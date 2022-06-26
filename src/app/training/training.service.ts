import { Exercise } from "./exercise.model";
import { Subject } from "rxjs";

export class TrainingService {
	private availableExercises: Exercise[] = [
		{ id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
		{ id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
		{ id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
		{ id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
	];

	exerciseStarted = new Subject<Exercise | null>();
	private completedExercises: Exercise[] = [];
	private runningExercise!: Exercise | null;

	getExercises() {
		return this.availableExercises.slice();
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
			this.completedExercises.push({...this.runningExercise, date: new Date, state: 'completed' });
		this.runningExercise = null;
		this.exerciseStarted.next(null);
	}

	cancelledExercise(progress: number) {
		if (this.runningExercise)
			this.completedExercises.push({...this.runningExercise, duration: this.runningExercise.duration * (progress / 100), calories: this.runningExercise.calories * (progress / 100), date: new Date, state: 'cancelled' });
		this.runningExercise = null;
		this.exerciseStarted.next(null);
	}

	getRunningExercise() {
		return this.runningExercise;
	}
}
