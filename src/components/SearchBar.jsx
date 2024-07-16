import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaLocationCrosshairs } from "react-icons/fa6";

const SearchBar = ({ setCity, setUnits }) => {
    const [queryCity, setQueryCity] = useState("");


    const searchByCityName = () => {
        if (queryCity !== '') {
            setCity({ q: queryCity });
        }
    };

    const currentLocation = ()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((pos)=>{
                const {longitude, latitude} = pos.coords
                setCity({lon: longitude, lat: latitude})
            })
        }
    };


    return (
        <div className='flex flex-row justify-center my-6'>
            <div className='flex flex-row justify-center items-center space-x-4'>
                <input value={queryCity} onChange={(e) => (setQueryCity(e.target.value))} type="text" placeholder='type city name'
                    className='text-gray-600 font-light p-2 w-[25rem] shadow-xl capitalize focus:outline-none  placeholder:lowercase' />
                <CiSearch onClick={searchByCityName} size={30} className='cursor-pointer hover:scale-105' />
                <FaLocationCrosshairs onClick={currentLocation} size={25} className='cursor-pointer hover:scale-105' />
            </div>
            <div className='flex flex-row items-center px-8 space-x-1'>
                <button onClick={()=>setUnits("metric")} className='text-2xl font-medium hover:scale-105'>°C </button>
                <p className='text-2xl font-medium hover:scale-105'>|</p>
                <button onClick={()=>setUnits("imperial")} className='text-2xl font-medium hover:scale-105'>°F</button>
            </div>
        </div>
    )
}

export default SearchBar;
