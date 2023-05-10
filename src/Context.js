import {createContext, useEffect, useRef, useState} from "react";

const Context = createContext()

export function ContextProvider({children}) {

    /* State to track if needed data fetching from server */
    const [stateChanged, setStateChanged] = useState(false)

    /* Ref to focus on text input */
    const textRef = useRef(null)

    /* Data from server */
    const [data, setData] = useState([]);

    /* Id of opened note at the moment */
    const [openedId, setOpenedId] = useState(1)

    /* State for text input (textarea) */
    const [text, setText] = useState('')

    /* State to track if text input (textarea) is active */
    const [inputTextActive, setInputTextActive] = useState(false)

    /* State for search input */
    const [searchText, setSearchText] = useState('')


    useEffect(() => {

        /* Fetch data */
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    "https://QuintaDB.com/apps/aEyHGLxJTgt7NdV3NcRSoi/dtypes/entity/cVW45mW41hWOaWt8kComkW.json?rest_api_key=aLWQJcRSnjW6dcIvRdT8ov&fetch_all=true"
                )
            ).json();

            /* Set states when the data received */
            setData(data?.records);
            setOpenedId(data?.records?.[0]?.id)
            setText(data?.records?.[0]?.values?.cOwKddKmjbW7ZdKgPHFmoK)

            /* If data is empty setting text input (textarea) empty also */
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

                    /* Field only created to filter records in DB by time when they was be changed (newest at the top) */
                    coWQmXimnpE5DFWR4bWReI: `${Date.now()}`,

                    /* Text field cannot be empty, bcs then data from the server comes only with the date field */
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

    const deleteNote = async () => {
        const requestOptions = {
            method: 'DELETE',
            body: JSON.stringify({
                rest_api_key: "aLWQJcRSnjW6dcIvRdT8ov",
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };

        await fetch(`https://QuintaDB.com/apps/aEyHGLxJTgt7NdV3NcRSoi/dtypes/${openedId}.json`, requestOptions)

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
                setInputTextActive, searchText, setSearchText
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Context