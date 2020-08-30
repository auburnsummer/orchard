import {useState} from "preact/hooks";

export default function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse it as JSON, or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // if error, just return initialValue anyway
            console.log(error);
            return initialValue;
        }
    });

    // Wrap useState's setter to also persist the new value to local storage.
    try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
        // just set it anyway
        setStoredValue(valueToStore);
        console.log(error);
    }

}