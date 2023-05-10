import {createContext, useEffect, useRef, useState} from "react";

const Context = createContext()

export function ContextProvider({children}) {

    const [stateChanged, setStateChanged] = useState(false)
    const textRef = useRef(null)
    const [data, setData] = useState([]);
    const [openedId, setOpenedId] = useState(1)
    const [text, setText] = useState('')
    const [inputTextActive, setInputTextActive] = useState(false)
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    "https://QuintaDB.com/apps/aEyHGLxJTgt7NdV3NcRSoi/dtypes/entity/cVW45mW41hWOaWt8kComkW.json?rest_api_key=aLWQJcRSnjW6dcIvRdT8ov&fetch_all=true"
                )
            ).json();

            // set state when the data received
            setData(data?.records);
            setOpenedId(data?.records?.[0]?.id)
            setText(data?.records?.[0]?.values?.cOwKddKmjbW7ZdKgPHFmoK)
            if (!data?.records?.[0]?.values?.cOwKddKmjbW7ZdKgPHFmoK) setText('')
        };

        dataFetch();
        setStateChanged(false)
    }, [stateChanged]);




    const addNewNote = async () => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                rest_api_key: "aLWQJcRSnjW6dcIvRdT8ov",
                values: {
                    entity_id: "cVW45mW41hWOaWt8kComkW",
                    coWQmXimnpE5DFWR4bWReI: `${Date.now()}`,
                    cOwKddKmjbW7ZdKgPHFmoK: 'New note'
                }
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };

        await fetch('https://QuintaDB.com/apps/aEyHGLxJTgt7NdV3NcRSoi/dtypes.json', requestOptions)
        setStateChanged(true)
    }

    const deleteNote = async (id) => {
        const requestOptions = {
            method: 'DELETE',
            body: JSON.stringify({
                rest_api_key: "aLWQJcRSnjW6dcIvRdT8ov",
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };

        await fetch(`https://QuintaDB.com/apps/aEyHGLxJTgt7NdV3NcRSoi/dtypes/${id}.json`, requestOptions)

        setStateChanged(true)
    }

    const updateNote = async () => {
        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify({
                rest_api_key: "aLWQJcRSnjW6dcIvRdT8ov",
                values: {
                    coWQmXimnpE5DFWR4bWReI: `${Date.now()}`,
                    cOwKddKmjbW7ZdKgPHFmoK: text
                }
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };

        await fetch(`https://QuintaDB.com/apps/aEyHGLxJTgt7NdV3NcRSoi/dtypes/${openedId}.json`, requestOptions)

        setStateChanged(true)
    }

    return (
        <Context.Provider
            value={{
                openedId, setOpenedId, text, setText, data, textRef,
                addNewNote, deleteNote, updateNote, inputTextActive,
                setInputTextActive, searchText, setSearchText}}>
            {children}
        </Context.Provider>
    )
}

export default Context