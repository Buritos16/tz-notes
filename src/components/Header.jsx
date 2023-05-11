import React, {useContext, useState} from 'react'
import {BiPlus, BiTrash, BiEdit} from 'react-icons/bi'
import SearchBox from "./SearchBox";
import Context from "../Context";

const Header = () => {

    /* To track if delete button is clicked */
    const [activeDeleteNoteIcon, setActiveDeleteNoteIcon] = useState(false)

    /* Data from context */
    const {textRef, openedId, addNewNote, deleteNote, inputTextActive, setInputTextActive} = useContext(Context)

    /* Handling delete note button */
    const handleDeleteNote = () => {
        {
            setActiveDeleteNoteIcon(true)
            let accept = window.confirm("Are you sure you want to delete note?")
            if (accept) deleteNote()
            setActiveDeleteNoteIcon(false)
        }
    }

    return (
        <div className='app-header'>
            <div className='button-container'>
                <button
                    className='button-element'
                    onClick={() => addNewNote()}
                >
                    <BiPlus/>
                </button>
                <button
                    className='button-element'
                    onClick={handleDeleteNote}
                    style={activeDeleteNoteIcon ? {backgroundColor: '#ececec'} : {}}

                >
                    <BiTrash/>
                </button>
                <button
                    className='button-element'
                    onClick={() => {
                        textRef.current.focus()
                        setInputTextActive(true)
                    }}
                    disabled={!openedId}
                    style={inputTextActive ? {backgroundColor: '#ececec'} : {}}
                >
                    <BiEdit/>
                </button>
            </div>
            <SearchBox />
        </div>
    )
}
export default Header
