import React, {useContext} from 'react'
import {BiPlus, BiTrash, BiEdit} from 'react-icons/bi'
import SearchBox from "./SearchBox";
import Context from "../Context";

const Header = () => {

    const {textRef, addItem} = useContext(Context)

    return (
        <div className='app-header'>
            <div className='button-container'>
                <button
                    className='button-element'
                    onClick={() => addItem()}
                >
                    <BiPlus/>
                </button>
                <button className='button-element'>
                    <BiTrash/>
                </button>
                <button
                    className='button-element'
                    onClick={() => {
                        textRef.current.focus()
                    }}
                >
                    <BiEdit/>
                </button>
            </div>
            <SearchBox />
        </div>
    )
}
export default Header
