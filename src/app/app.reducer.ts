export interface State {
	isLoading: boolean
}
const initialState: State = {
	isLoading: false
}
export function appReducer(state = initialState, action) {
	switch (action.type) {
		case 'START_LOADING':
			return { isLoading: true };
		case 'STOP_LOADING':
			return { isLoading: true };
		default:
			return state;
	}
}
