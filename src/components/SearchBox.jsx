import React, {useRef} from 'react'
import {BiSearch} from 'react-icons/bi'

const SearchBox = () => {

    const inputRef = useRef(null)

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
            />
        </div>
    )
}
export default SearchBox
