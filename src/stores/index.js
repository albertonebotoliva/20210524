import annotations from './mockAnnotations';
import { v4 as uuidv4 } from 'uuid';

export const initialState = {
    mode: "brush",
    image: {
        id: 1,
        url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1080&q=80"
    },
    categories: [
        { id: 1, name: "Tires", color: "red" },
        { id: 2, name: "Lights", color: "green" },
        { id: 3, name: "Logos", color: "blue" },
        { id: 4, name: "Windows", color: "orange" },
    ],
    annotations,
    selected: {},
    open: [],
    openAll: false,
    openSearch: false,
    filter: "",
    filterResults: [
        { id: 1, name: "Tires", color: "red" },
        { id: 2, name: "Lights", color: "green" },
        { id: 3, name: "Logos", color: "blue" },
        { id: 4, name: "Windows", color: "orange" },
    ],
    showOnly: null
};

export function reducer(state, action) {
    let annotations = {}
    switch (action.type) {
        case 'set_mode':
            return { ...state, mode: action.mode }
        case 'set_filter':
            return { ...state, filter: action.filter, filterResults: state.categories.filter(category => category.name.toLowerCase().includes(action.filter.toLowerCase())) };
        case 'set_selected':
            return { ...state, selected: state.categories.find(category => category.id === action.selected) };
        case 'set_open':
            state.open[action.index] = !state.open[action.index];
            return { ...state, open: [...state.open] }
        case 'toggle_open_all':
            return { ...state, open: Array(state.categories.length).fill(action.open), openAll: action.open }
        case 'toggle_open_search':
            return { ...state, openSearch: action.open }
        case 'add_annotation':
            const annotation = {
                id: uuidv4(),
                hidden: false,
                image: state.image,
                category: state.selected,
                position: {
                    "00": action.coordinates[0],
                    "01": [action.coordinates[1][0], action.coordinates[0][1]],
                    "10": [action.coordinates[0][0], action.coordinates[1][1]],
                    "11": action.coordinates[1],
                }
            }

            annotations = Object.assign({}, state.annotations);
            annotations[state.selected.id]
                ? annotations[state.selected.id].push(annotation)
                : annotations[state.selected.id] = [annotation];

            return { ...state, annotations }
        case 'delete_annotation':
            annotations = state.annotations;
            annotations[action.annotation.category.id].splice(action.index, 1);
            return { ...state, annotations }
        case 'toggle_annotation_visibility':
            annotations = state.annotations;
            annotations[action.annotation.category.id][action.index].hidden = !annotations[action.annotation.category.id][action.index].hidden;
            return { ...state, annotations }
        case 'toggle_all_annotation_visibility':
            return state.showOnly
                ? { ...state, showOnly: null }
                : { ...state, showOnly: { category: action.annotation.category.id, index: action.index } }
        default:
            throw new Error();
    }
}