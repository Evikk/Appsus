import { utilService } from '../../../services/utilService.js'
import { storageService } from '../../../services/storageService.js'
export const keepService = {
    query,
    addNote

}

window.keep = keepService

var gNotes;
const STORAGE_KEY = 'notesDB'
createNotes()

function createNotes() {
    gNotes = storageService.loadFromStorage(STORAGE_KEY)
    if (!gNotes || !gNotes.length) {
        gNotes = demoNotes()
        storageService.saveToStorage(STORAGE_KEY, gNotes)

    }
}


function query() {
    return Promise.resolve(gNotes)
}


function addNote(note) {
    var newNote = {

        id: utilService.makeId(),
        type: note.type,
        isPinned: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        info: {},
        style: {
            backgroundColor: '#00d',
            color: 'red',
            fontSize: 15,
            fontFamily: ''
        }
    }

    switch (newNote.type) {
        case 'txt':
            newNote.info = {
                label: note.label,
                txt: note.inputValue
            }
            break;
        case 'img':
            newNote.info = {
                label: note.label,
                url: note.inputValue,
            }
            break;

        case 'video':
            var src = note.inputValue.replace('watch?v=', 'embed/')
            newNote.info = {
                label: note.label,
                src,
            }
            break;
        case 'todos':
            newNote.info = {
                label: note.label,
                todos: [
                    { txt: '', doneAt: null },
                    { txt: '', doneAt: null }
                ]
            }
            break;
    }
    gNotes.unshift(newNote)
    storageService.saveToStorage(STORAGE_KEY, gNotes)

}


function demoNotes() {

    var notes = [{

            id: utilService.makeId(),
            type: 'txt',
            isPinned: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            info: {
                label: '',
                txt: 'Fullstack Me Baby!'
            },
            style: {
                backgroundColor: '#00d',
                color: 'black',
                fontSize: 15,
                fontFamily: ''
            }
        },
        {
            id: utilService.makeId(),
            type: 'img',
            isPinned: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            info: {
                label: '',
                url: 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg',
                title: 'Me playing Mi'
            },
            style: {
                backgroundColor: '#00d',
                color: 'black',
                fontSize: 15,
                fontFamily: ''
            }
        },
        // {


        //     id: utilService.makeId(),
        //     type: 'todos',
        //     isPinned: false,
        //     createdAt: Date.now(),
        //     updatedAt: Date.now(),
        //     info: {
        //         label: '',
        //         todos: [
        //             { txt: 'Do that', doneAt: null },
        //             { txt: 'Do this', doneAt: null }
        //         ]
        //     },

        //     style: {
        //         backgroundColor: '#00d',
        //         color: 'black',
        //         fontSize: 15,
        //         fontFamily: ''
        //     }
        // },
        // {


        //     id: utilService.makeId(),
        //     type: 'video',
        //     isPinned: false,
        //     createdAt: Date.now(),
        //     updatedAt: Date.now(),
        //     info: {
        //         label: '',
        //         videos: [{
        //             title: '',
        //             src: ''
        //         }]

        //     },

        //     style: {
        //         backgroundColor: '#00d',
        //         color: 'black',
        //         fontSize: 15,
        //         fontFamily: ''
        //     }
        // }
    ]
    return notes
}