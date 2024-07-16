import React from 'react';

const Forecast = ({ title, data }) => {
  return (
    <div className="mt-6">
      <p className="font-medium uppercase">{title}</p>
      <hr className="my-1"/>

      <div className="flex justify-between mt-2">
        {data && data.map((d, index) => (
          <div className="flex flex-col items-center text-center" key={index}>
            <p className="font-light text-sm">{d.title}</p>
            <img className="w-12" src={d.icon} alt={d.description} />
            <p className="font-medium">{`${d.temp}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
