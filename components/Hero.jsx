import Image from 'next/image'
import React, { useState } from 'react'

function Hero() {
  const [searchTerm, setSearchTerm] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  async function fetchWeatherData() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a1c8b86fb2mshf4321f90cf269a5p10f005jsn87c0c93c086b',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      },
    }

    const weatherResponse = await fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=' + searchTerm, options)
    const weatherData = await weatherResponse.json()
    setWeatherData(weatherData)
  }

  function handleSubmit(event) {
    event.preventDefault()
    fetchWeatherData()
  }

  return (
    <div className="bg-slate-50 h-screen space-y-5">
      <div className="text-center py-10 my-auto items-center">
        <form className="space-x-5 flex justify-center px-3 " onSubmit={handleSubmit}>
          <div className="flex space-x-5 items-center">
            <label className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md  " htmlFor="searchTerm">
              Şehir ismi:
            </label>
            <input
              className="hadow appearance-none border border-blue-500 rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="searchTerm"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">
            Button
          </button>
        </form>

        {weatherData ? (
          <>
            <h1 className="text-3xl py-5 font-serif ">{weatherData?.location?.name} Hava Durumu</h1>
            <p className="text-3xl py-5 font-serif ">{weatherData?.current?.temp_c}°C</p>
            <p className="text-3xl py-5 font-serif "> {weatherData?.current?.condition.text}</p>
          </>
        ) : (
          <p>Arama sonucu yükleniyor...</p>
        )}
      </div>

      <div className="text-center text-2xl">
        {' '}
        <h1>Lütfen Şehir ismini doğru girin aksi takdirde çalışmayacakıtr</h1>
      </div>
    </div>
  )
}

export default Hero
