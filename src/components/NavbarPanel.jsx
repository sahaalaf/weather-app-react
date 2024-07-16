import React from 'react'

const NavbarPanel = ({setCity}) => {

    const cities = [
        {
            id: 1,
            name: "Islamabad"
        },
        {
            id: 2,
            name: "Peshawar"
        },
        {
            id: 3,
            name: "Swabi"
        },
        {
            id: 4,
            name: "Lahore"
        },
        {
            id: 5,
            name: "Kamra"
        }
    ]

    return (
        <div className='flex items-center justify-around my-4'>
            {cities.map(city => (<button key={city.id} className='text-lg  hover:bg-gray-700/25 px-3 py-2 rounded-md transition ease-in ' onClick={()=>setCity({q:city.name})}>{city.name} </button>))}

        </div>
    )
}

export default NavbarPanel
