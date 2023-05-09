import {createContext, useEffect, useRef, useState} from "react";

const Context = createContext()

export function ContextProvider({children}) {

    const textRef = useRef(null)
    const [data, setData] = useState([]);

    useEffect(() => {

        // fetch data
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    "https://QuintaDB.com/apps/b-dSo_xmnjWQNdVe9vW6DO/dtypes/entity/cdWRjCiMHle4kMW53dPqDi.json?rest_api_key=ddNmoZW5DnWOqTEuddVSog&fetch_all=true"
                )
            ).json();

            // set state when the data received
            setData(data.records);
            console.log(data.records)
        };

        dataFetch();
    }, []);

    const [openedId, setOpenedId] = useState(1)
    const [text, setText] = useState('')


    const addItem = () => {
        setData([
            {
                id: 1,
                values: {
                    dcUSo7WRfdRA_dOfmlC8kL: '',
                    dcVW1kbMHdLjXZWO7cU8o4: '',
                }
            }
            , ...data])
        setOpenedId(1)
        setText('')
    }

    const setNewText = (e) => {
        setText(e.target.value)

    }

    return (
        <Context.Provider value={{openedId, setOpenedId, text, setText, setNewText, data, textRef, addItem}}>
            {children}
        </Context.Provider>
    )
}

export default Context