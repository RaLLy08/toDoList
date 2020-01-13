import {createStore} from 'redux';

class Controller { 
    constructor(view) {
        this._view = view;
        this._store = createStore(this.reducer);

        this._initialState = [{
            text: 'first task',
            id: 0,
            completed: false
        }]

    }   

    reducer = (state = this._initialState, action) => {
        switch (action.type) {
            case 'ADD_TODO':
                return [
                    ...state,
                    {
                        text: action.text,
                        id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
                    }
                   
                ];
            case 'DELETE_TODO':
                return state.filter(todo =>
                    todo.id !== +action.id
                );
            case 'COMPLETE_TODO':
                return state.map(todo =>
                    todo.id === +action.text ?
                        { ...todo, completed: !todo.completed } :
                        todo
                );
            default:
                return state;
        }
    };    
    
    getState = () => this._store.getState();


    dispatch = action => {
        this._store.dispatch(action);
    };

    subscribe = cb => {
        this._store.subscribe(cb);
    }
}

export default Controller;
