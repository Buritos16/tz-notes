import React, {useContext, useEffect} from 'react'
import Context from "../Context";

const Sidebar = () => {

    useEffect(() => {

    }, [])

    const {data, openedId, setOpenedId, setText} = useContext(Context)

    return (
        <div className='sidebar'>
            <div className='sidebar-content'>
                {data.map(({id, values}) => (
                    <div
                        className='sidebar-item'
                        key={id}
                        style={id === openedId ? {backgroundColor: '#eed586'} : {}}
                        onClick={() => {
                            setOpenedId(id)
                            setText(values.dcVW1kbMHdLjXZWO7cU8o4)
                        }}
                    >
                        <div className='sidebar-data'>
                            <div className='sidebar-text'>{values.dcVW1kbMHdLjXZWO7cU8o4 || 'New note'}</div>
                            <div className='sidebar-date'>{values.dcUSo7WRfdRA_dOfmlC8kL}</div>
                        </div>
                        <div
                            className='sidebar-endline'
                            style={id === openedId ? {display: 'none'} : {}}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Sidebar
