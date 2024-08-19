import { createStore } from 'redux';
import { combineReducers } from 'redux';

const initialFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

const favoritesReducer = (state = initialFavorites, action) => {
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            if (state.includes(action.payload)) {
                return state.filter(id => id !== action.payload);
            } else {
                return [...state, action.payload];
            }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    favorites: favoritesReducer,
});

const store = createStore(rootReducer);

store.subscribe(() => {
    localStorage.setItem('favorites', JSON.stringify(store.getState().favorites));
});

export default store;
