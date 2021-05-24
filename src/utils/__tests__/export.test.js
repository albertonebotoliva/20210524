import React from 'react';
import { reducer, initialState } from '../../stores'
import { parse } from '../parser';

describe('Export', () => {
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
    test('export_data', () => {
        let state = reducer(initialState, { type: "set_selected", selected: 1 })
        state = reducer(state, { type: "add_annotation", coordinates: [[0, 0], [100, 100]] });
        state = reducer(state, { type: "add_annotation", coordinates: [[0, 0], [100, 100]] });
        state = reducer(state, { type: "set_selected", selected: 2 })
        state = reducer(state, { type: "add_annotation", coordinates: [[0, 0], [100, 100]] });
        state = reducer(state, { type: "add_annotation", coordinates: [[0, 0], [100, 100]] });
        state = reducer(state, { type: "set_selected", selected: 3 })
        state = reducer(state, { type: "add_annotation", coordinates: [[0, 0], [100, 100]] });
        state = reducer(state, { type: "add_annotation", coordinates: [[0, 0], [100, 100]] });
        state = reducer(state, { type: "add_annotation", coordinates: [[0, 0], [100, 100]] });
        state = reducer(state, { type: "add_annotation", coordinates: [[0, 0], [100, 100]] });
        const parsedObject = parse(state.annotations);
        expect(parsedObject.OBJECT_DETECTION_JOB.annotations.length).toEqual(8);
    })
})
