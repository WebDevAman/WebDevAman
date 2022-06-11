import { useRouter } from 'next/router';
import React, { FormEvent, useContext, useState } from 'react'
import { BsSearch } from "react-icons/bs";
import { ThemeContext } from '../context/themeContext';

const SearchBar = () => {
    const Router = useRouter()
    const { theme, show } = useContext(ThemeContext)
    const [searchInput, setSearchInput] = useState("");
    const [placeHolder, setPlaceHolder] = useState("Search");
    const handleSubmitSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchInput.replaceAll(' ', '').length > 0) { Router.push(`/search?q=${searchInput}`) }
        else {
            setSearchInput('')
            setPlaceHolder('Please type something..')
        }
    };


    return (
        <div style={{
            border: `1px solid ${theme === 'light' ? '#E1E1E1' : '#4a4a4a'}`, borderRadius: '3px'
        }} className={`flex ${show ? 'xsm:flex' : 'xsm:hidden'} w-full sm:flex ${theme === 'light ' ? 'bg-white' : 'bg-[#4A4A4A]'} items-center mb-4 overflow-hidden`}>
            <form onSubmit={handleSubmitSearch} className={`${theme === 'light' ? 'bg-[#fff]' : 'bg-[#222] '} flex items-center flex-1`}>
                <div className={`${theme === 'light' ? 'text-[#444]' : 'text-[#efefef]'} pl-3`}>
                    <BsSearch />
                </div>
                <input minLength={1} type="search" onChange={(e) => setSearchInput(e.target.value)} name="search" aria-label='search' className={`${theme === 'light' ? 'text-[#444]' : 'text-[#efefef]'}  bg-transparent text-lg flex-1 pr-2 outline-none pl-3 w-[90%]`} placeholder={placeHolder} />
                <button style={{ borderRadius: ' 0px 3px 3px 0px' }} type='submit' className='font-khand-headers xsm:px-4 md:px-6 transition duration-300 relative z-50 bg-[#4A4A4A] hover:bg-[#333] leading-[16px] py-2.5 text-white text-[15px] font-md'>
                    Search
                </button>
            </form >
        </div >

    )
}

export default SearchBar