import { Exercise } from "./exercise.model";
import * as fromRoot from '../app.reducer';
import * as TRActions from './training.actions';

export interface TrainigState {
	availableExercises: Exercise[];
	finishedExercises: Exercise[];
	activeTraining: Exercise
}
// this module is loaded lazily, we can't put it into app.reducer, so we will just extend its State
export interface State extends fromRoot.State {
	training: TrainigState
}

const initialState: TrainigState = {
	availableExercises: [],
	finishedExercises: [],
	activeTraining: null
}

export function trainingReducer(state = initialState, action: TRActions.TrainingActions) {
	switch (action.type) {
		case TRActions.SET_AVAILABLE_TRAININGS:
			return {
				...state,
				availableExercises: action.payload
			};

		case TRActions.SET_FINISHED_TRAININGS:
			return {
				...state,
				finishedExercises: action.payload
			};

		case TRActions.START_TRAINING:
			return {
				...state,
				activeTraining: action.payload
			 };

		case TRActions.STOP_TRAINING:
			return {
				...state,
				activeTraining: null
			};

		default:
			return state;
	}

}

export const getAvailableExercises = (state: TrainigState) => state.availableExercises;
export const getFinishedExercises = (state: TrainigState) => state.finishedExercises;
export const getActiveTraining = (state: TrainigState) => state.activeTraining;
