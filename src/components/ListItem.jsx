import React, {useContext, useRef, useState} from 'react'
import Context from "../Context";

const ListItem = () => {

    const {text, setNewText, textRef} = useContext(Context)

    return (
        <div className='list-item'>
            <textarea
                ref={textRef}
                className='list-item-text'
                value={text}
                onChange={(e) => {
                    setNewText(e)

                }}
            />
        </div>
    )
}
export default ListItem
