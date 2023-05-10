import React, {useContext} from 'react'
import Context from "../Context";

const Sidebar = () => {

    /* Data from context */
    const {data, openedId, setOpenedId, setText, searchText} = useContext(Context)

    /* Handling click on sidebar item */
    const sidebarItemClicked = (id, values) => {
        setOpenedId(id)
        setText(values.cOwKddKmjbW7ZdKgPHFmoK)
        if (!values.cOwKddKmjbW7ZdKgPHFmoK) setText('')
    }


    return (
        <div className='sidebar'>
            <div className='sidebar-content'>
                {data?.filter((note) =>
                    /* Filtered data by search input */
                    note?.values?.cOwKddKmjbW7ZdKgPHFmoK.toLowerCase().includes(searchText)
                )?.map(({
                               id, values, updated_at
                           }) => {

                    /* Date formatting */
                    let date = new Date(updated_at)
                    let Y = date.getFullYear().toString()
                    let M = (date.getMonth() + 1).toString()
                    if (date.getMonth() < 10) {
                        M = `0${date.getMonth() + 1}`
                    }
                    let D = (date.getDate()).toString()
                    if (date.getDate() < 10) {
                        D = `0${date.getDate()}`
                    }
                    let h = date.getHours().toString()
                    if (date.getHours() < 10) {
                        h = `0${date.getHours()}`
                    }
                    let m = date.getMinutes().toString()
                    if (date.getMinutes() < 10) {
                        m = `0${date.getMinutes()}`
                    }
                    let dateFirst = `${h}:${m}`
                    let dateSecond = `${D}/${M}/${Y}`
                    return (
                        <div
                            className='sidebar-item'
                            key={id}
                            style={id === openedId ? {backgroundColor: '#eed586'} : {}}
                            onClick={() => sidebarItemClicked(id, values)}
                        >
                            <div className='sidebar-data'>
                                <div
                                    className='sidebar-text'>{values.cOwKddKmjbW7ZdKgPHFmoK}</div>
                                <div className='sidebar-date'>
                                    <div className='sidebar-date-time'>{dateFirst}</div>
                                    <div>{dateSecond}</div>
                                </div>
                            </div>
                            <div
                                className='sidebar-endline'
                                style={id === openedId ? {display: 'none'} : {}}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Sidebar
