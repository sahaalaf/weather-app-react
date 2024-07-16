import React from 'react'
import { BiSolidDropletHalf as Humidity } from "react-icons/bi";
import { FaThermometerHalf as Temp } from "react-icons/fa";
import { FiWind as WindSpeed } from "react-icons/fi";
import { GiSunrise as Sunrise } from "react-icons/gi";
import { GiSunset as SunSet } from "react-icons/gi";
import { MdKeyboardArrowDown as ArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp as ArrowUp } from "react-icons/md";

const TempHumdityEtc = ({weather:{temp, temp_max, temp_min, humidity, speed, icon, details, feels_like, sunrise, sunset}}) => {

    const weatherDetails = [
        {
            id: 1,
            Icon: Temp,
            title: "Real Feel",
            value: `${feels_like}°C`,
        },
        {
            id: 2,
            Icon: Humidity,
            title: "Humidity",
            value: `${humidity}%`,
        },
        {
            id: 3,
            Icon: WindSpeed,
            title: "Wind",
            value: `${speed} km/h`,
        }
    ]

    const sunRiseEtc = [
        {
            id: 1,
            Icon: Sunrise,
            title: "Rise",
            value: `${sunrise}`
        },
        {
            id: 2,
            Icon: SunSet,
            title: "Set",
            value: `${sunset}`
        },
        {
            id: 3,
            Icon: ArrowUp,
            title: "High",
            value: `${temp_max}°C`
        },
        {
            id: 4,
            Icon: ArrowDown,
            title: "Low",
            value: `${temp_min}°C`

        }
    ]


    return (
        <div>
            <div className='flex items-center justify-center py-6 text-xl text-cyan-100'>
                <p>{details}</p>
            </div>

            <div className='flex flex-row items-center justify-between py-3'>
                <img className='w-24' src={icon} />
                <p className='text-5xl'>{temp+ "°"}</p>

                <div className='flex flex-col space-y-3 items-start'>
                    {
                        weatherDetails.map(({ id, Icon, title, value }) => (
                            <div key={id} className='flex font-light text-sm items-center justify-center'>
                                <Icon size={18} className='mr-1' />
                                {`${title} ${value}`}
                            </div>
                        ))
                    }
                </div>

            </div>

            <div className='flex flex-row items-center justify-center space-x-10 text-sm py-4'>
                {
                    sunRiseEtc.map(({ id, Icon, title, value }) => (
                        <div key={id} className='flex font-light text-sm items-center justify-center'>
                            <Icon size={30} className='mr-1' />
                            {<p className='font-light ml-1'>{title} <span className='font-medium ml-1'>{value}</span></p>}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TempHumdityEtc
