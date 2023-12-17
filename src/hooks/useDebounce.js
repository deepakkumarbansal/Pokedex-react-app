import React from 'react'

function useDebounce(cb, delay = 2000){
    let timerid;
    return (...args) => { // rest operator 
        clearTimeout(timerid);
        timerid = setTimeout(() => {
            cb(...args)
        }, delay);
    }
}

export default useDebounce
