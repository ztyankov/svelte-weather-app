import { writable } from 'svelte/store'
import { unitTypes } from './lib/constants';

export const store = writable({
    city: 'Sofia',
    units: unitTypes.metric
});

export const dispatch = (action) => new Promise(resolve => {
    store.update(state => {
        resolve();
        if (action.type === 'SET_CITY') {
            return {
                ...state, city: action.payload
            }
        }
        if (action.type === 'SET_UNITS') {
            return {
                ...state, units: action.payload
            }
        }
    })

})