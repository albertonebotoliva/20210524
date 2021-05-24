import React from 'react';
import { reducer, initialState } from '../'

describe('Reducer', () => {
    const annotation = {
        id: '438b3fa7-fbae-495b-b0a7-8e833de2e34b',
        hidden: false,
        image: {
            id: 1,
            url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1080&q=80'
        },
        category: { id: 1, name: 'Tires', color: 'red' },
        position: {
            '10': [0, 100],
            '11': [100, 100],
            '00': [0, 0],
            '01': [100, 0]
        }
    }

    test('set_mode', () => {
        let state = reducer(initialState, { type: "set_mode", mode: "brush" });
        expect(state.mode).toEqual("brush");
    })
    test('set_filter', () => {
        let state = reducer(initialState, { type: "set_filter", filter: "tires" });
        expect(state.filterResults).toEqual([{ id: 1, name: "Tires", color: "red" }]);
    })
    test('set_selected', () => {
        let state = reducer(initialState, { type: "set_selected", selected: 1 });
        expect(state.selected).toEqual({ id: 1, name: "Tires", color: "red" });
    })
    test('set_open', () => {
        let state = reducer(initialState, { type: "set_open", index: 0 });
        expect(state.open).toEqual([true]);
    })
    test('toggle_open_all', () => {
        let state = reducer(initialState, { type: "toggle_open_all", open: true });
        expect(state.openAll).toEqual(true);
    })
    test('toggle_open_search', () => {
        let state = reducer(initialState, { type: "toggle_open_search", open: true });
        expect(state.openSearch).toEqual(true);
    })
    test('add_annotation', () => {
        let state = reducer(initialState, { type: "set_selected", selected: 1 })
        state = reducer(state, { type: "add_annotation", coordinates: [[0, 0], [100, 100]] });
        state = reducer(state, { type: "add_annotation", coordinates: [[0, 0], [100, 100]] });
        state = reducer(state, { type: "add_annotation", coordinates: [[0, 0], [100, 100]] });
        expect(state.annotations["1"].length).toEqual(3);
    })
    test('delete_annotation', () => {
        let state = reducer(initialState, { type: "set_selected", selected: 1 });
        state = reducer(state, { type: "add_annotation", coordinates: [[0, 0], [100, 100]] });
        state = reducer(state, { type: "delete_annotation", index: 0, annotation });
        expect(state.annotations["1"]).toEqual([]);
    })
    test('toggle_annotation_visibility', () => {
        let state = reducer(initialState, { type: "set_selected", selected: 1 });
        state = reducer(state, { type: "add_annotation", coordinates: [[0, 0], [100, 100]] });
        state = reducer(state, { type: "toggle_annotation_visibility", index: 0, annotation });
        expect(state.annotations["1"][0].hidden).toEqual(true);
    })
    test('toggle_all_annotation_visibility', () => {
        let state = reducer(initialState, { type: "set_selected", selected: 1 });
        state = reducer(state, { type: "add_annotation", coordinates: [[0, 0], [100, 100]] });
        state = reducer(state, { type: "toggle_all_annotation_visibility", index: 0, annotation });
        expect(state.showOnly).toEqual({ category: 1, index: 0 });
    })
});

