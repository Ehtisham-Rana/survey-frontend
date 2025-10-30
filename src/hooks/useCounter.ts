import { useState } from "react";


const useCounter = (initialValue: number=0) => {
    const [count, setCount] = useState(initialValue);

    const increment = () => {
        setCount((prevCount) => prevCount + 1);
    };

    const decrement = () => {
       if(count > 0) {setCount((prevCount) => prevCount - 1);}
    };
    const reset = () => {
        setCount(initialValue);
    };
    return {count, increment, decrement, reset}
} 

export default useCounter;