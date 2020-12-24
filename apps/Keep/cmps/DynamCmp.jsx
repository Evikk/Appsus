import { NoteImg } from "./NoteImg.jsx"
import { NoteTxt } from "./NoteTxt.jsx"
import { NoteVideo } from './NoteVideo.jsx'
import { NoteTodos } from './NotesTodos.jsx'



export function DynamCmp({ note }) {

    switch (note.type) {
        case 'txt':
            return <NoteTxt note={note} />
        case 'img':
            return <NoteImg note={note} />
        case 'video':
            return <NoteVideo note={note} />
        case 'todos':
            return <NoteTodos note={note} />
    }
    return <p>Yasss</p>
}


