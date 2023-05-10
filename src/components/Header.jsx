import React, {useContext, useState} from 'react'
import {BiPlus, BiTrash, BiEdit} from 'react-icons/bi'
import SearchBox from "./SearchBox";
import Context from "../Context";

const Header = () => {

    const [activeDeleteNoteIcon, setActiveDeleteNoteIcon] = useState(false)
    const {openedId, textRef, addNewNote, deleteNote, inputTextActive, setInputTextActive} = useContext(Context)

    return (
        <div className='app-header'>
            <div className='button-container'>
                <button
                    className='button-element'
                    onClick={() => {
                        addNewNote()
                    }}
                >
                    <BiPlus/>
                </button>
                <button
                    className='button-element'
                    onClick={() => {
                        setActiveDeleteNoteIcon(true)
                        let accept = window.confirm("Are you sure you want to delete note?")
                        if (accept) deleteNote(openedId)
                        setActiveDeleteNoteIcon(false)
                    }}
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
