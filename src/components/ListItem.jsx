import React, {useContext, useEffect} from 'react'
import Context from "../Context";
import {useDebouncedCallback} from "use-debounce";

const ListItem = () => {

    /* Data from context */
    const {text, setText, textRef, updateNote, setInputTextActive, data, openedId} = useContext(Context)

    /* Debounce API call to server */
    const debounced = useDebouncedCallback((stopDebounce = false) => {
        if (stopDebounce) return
        updateNote(openedId)
    }, 700)

    /* Date formatting */
    const date = new Date(data?.find(x => x?.id === openedId)?.updated_at)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    let h = date.getHours().toString()
    if (date.getHours() < 10) {
        h = `0${date.getHours()}`
    }
    let m = date.getMinutes().toString()
    if (date.getMinutes() < 10) {
        m = `0${date.getMinutes()}`
    }
    const dateFull = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${h}:${m}`

    useEffect(() => {
        setText(data?.find(x => x?.id === openedId)?.values?.cOwKddKmjbW7ZdKgPHFmoK)
        if (!openedId) setText('')
    }, [openedId])

    return (
        <div className='list-item'>
            <div className='list-item-date'>
                {openedId ? dateFull : ''}
            </div>
            <textarea
                disabled={!openedId}
                ref={textRef}
                className='list-item-text'
                value={text}
                onChange={(e) => {
                    setText(e.target.value)
                    debounced()
                }}
                onClick={() => setInputTextActive(true)}
                onBlur={() => {
                    setInputTextActive(false)
                    updateNote(openedId)
                    debounced(true)
                }}
            />
        </div>
    )
}
export default ListItem
