import React, {useState} from 'react';
import axios from 'axios';

function Write() {

    let [inputValue, setInputValue] = useState("");

    const saveData = async () => {
        try {
            await axios.post("http://localhost:5000/writetodatabase", { content: inputValue })
            console.log("Data", inputValue);
            alert("Data saved: ", inputValue);
        } catch (error) {
            console.log("Error while saving data: ", error.message)
        }
    }

    return (
        
    )

}

