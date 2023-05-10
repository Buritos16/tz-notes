import React, {useContext, useRef} from 'react'
import {BiSearch} from 'react-icons/bi'
import Context from "../Context";

const SearchBox = () => {

    /* Ref to focus on search input */
    const inputRef = useRef(null)

    /* Data from context */
    const {setSearchText} = useContext(Context)

    return (
        <div
            className='search-box'
            onClick={() => {
                inputRef.current.focus()
            }}
        >
            <BiSearch style={{fontSize: '1rem'}}/>
            <input
                ref={inputRef}
                className='search-input'
                placeholder='Search'
                onChange={(e) => setSearchText(e.target.value)}
            />
        </div>
    )
}
export default SearchBox
