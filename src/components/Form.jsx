import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'
import { set } from 'zod'

const carTypes = [
  { name: 'Cabriolet' },
  { name: 'Citadine' },
  { name: 'Berline' },
  { name: 'SUV / 4x4' },
]

const energyTypes = [
  { name: 'Essence' },
  { name: 'Electrique' },
  { name: 'Gaz' },
  { name: 'Diesel' },
  { name: 'Hybride' },
]

export default function Form() {
  const [carSelected, setCarSelected] = useState(carTypes[0])
  const [energySelected, setEnergySelected] = useState(energyTypes[0])
  const [kilometers, setKilometers] = useState(0)
  const [year, setYear] = useState(0)
  const [resultsf, setResultsf] = useState(0)
  const [borrowingRate, setBorrowingRate] = useState(0)
  const [passengers, setPassengers] = useState(1)
  const [finalResult, setFinalResult] = useState(0)

  const addPassengers = () => {
    if (passengers < 4) {
      setPassengers(passengers + 1)
    }
  }

  const removePassengers = () => {
    if (passengers > 1) {
      setPassengers(passengers - 1)
    }
  }

  // callculate result in real time
  useEffect(() => {
    console.log(kilometers)
    //console.log(carSelected.name, energySelected.name, kilometers, year, passengers)
    let carSelectedScore = 0

    switch (carSelected.name) {
      case 'Cabriolet':
        carSelectedScore = 6
        break
      case 'Citadine':
        carSelectedScore = 8
        break
      case 'Berline':
        carSelectedScore = 6.5
        break
      case 'SUV / 4x4':
        carSelectedScore = 4
        break
      default:
        break
    }

    let energySelectedScore = 0
    switch (energySelected.name) {
      case 'Essence':
        energySelectedScore = 5
        break
      case 'Electrique':
        energySelectedScore = 9
        break
      case 'Gaz':
        energySelectedScore = 6
        break
      case 'Diesel':
        energySelectedScore = 4
        break
      case 'Hybride':
        energySelectedScore = 7
        break
      default:
        break
    }

    let kms
    if (kilometers < 5000) {
      kms = 10
    } else if (kilometers < 10000) {
      kms = 9
    } else if (kilometers < 15000) {
      kms = 7
    } else if (kilometers < 20000) {
      kms = 5
    } else if (kilometers < 25000) {
      kms = 3
    } else {
      kms = 1
    }

    let yearScore
    if (year < 1960) {
      yearScore = 0
    } else if (year < 1970) {
      yearScore = 1
    } else if (year < 1980) {
      yearScore = 2
    } else if (year < 1990) {
      yearScore = 3
    } else if (year < 2000) {
      yearScore = 4
    } else if (year < 2010) {
      yearScore = 5
    } else {
      yearScore = 7
    }

    setResultsf(carSelectedScore + energySelectedScore + kms + yearScore)

    console.log(resultsf)
    if (resultsf < 10) {
      setBorrowingRate(3)
    } else if (resultsf < 15) {
      setBorrowingRate(2.74)
    } else if (resultsf < 25) {
      setBorrowingRate(2.52)
    } else if (resultsf < 33) {
      setBorrowingRate(2.1)
    } else {
      setBorrowingRate(1.85)
    }

    let altborrowingRate = borrowingRate

    if (passengers === 1) {
      altborrowingRate = altborrowingRate + 0.11
    } else if (passengers === 2) {
      altborrowingRate = altborrowingRate - 0.17
    } else if (passengers === 3) {
      altborrowingRate = altborrowingRate - 0.29
    } else if (passengers === 4) {
      altborrowingRate = altborrowingRate - 0.53
    }

    setFinalResult(altborrowingRate)

    if (kilometers == 0 || year == 0) {
      setBorrowingRate(0)
    }
  }, [
    kilometers,
    year,
    carSelected,
    energySelected,
    passengers,
    resultsf,
    borrowingRate,
  ])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center p-16 gap-5 shadow-2xl rounded-md">
        <h1 className="text-6xl font-bold text-emerald-600 my-5">Simulation</h1>
        <div className="w-72 flex flex-col gap-1.5">
          <label htmlFor="passengers">Nombre de passagers :</label>
          <div className="w-full flex">
            <button
              className="w-1/3 bg-emerald-600 rounded-l-lg text-white py-2"
              onClick={addPassengers}
            >
              +
            </button>
            <p className="w-1/3 bg-emerald-100 border-b-2 text-emerald-600 border-t-2  border-emerald-600 text-center py-2">
              {passengers}
            </p>
            <button
              className="w-1/3 bg-emerald-600 rounded-r-lg text-white py-2"
              onClick={removePassengers}
            >
              -
            </button>
          </div>
        </div>
        <div className="w-72 flex flex-col gap-1.5">
          <label htmlFor="car">Type de voiture :</label>
          <Listbox value={carSelected} onChange={setCarSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm">
                <span className="block truncate">{carSelected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-40">
                  {carTypes.map((carType, carIdx) => (
                    <Listbox.Option
                      key={carIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'text-gray-900'
                        }`
                      }
                      value={carType}
                    >
                      {({ carSelected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              carSelected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {carType.name}
                          </span>
                          {carSelected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-emerald-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        <div className="w-72 flex flex-col gap-1.5">
          <label htmlFor="energy">Energie :</label>
          <Listbox value={energySelected} onChange={setEnergySelected}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm">
                <span className="block truncate">{energySelected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-40">
                  {energyTypes.map((carType, carIdx) => (
                    <Listbox.Option
                      key={carIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'text-gray-900'
                        }`
                      }
                      value={carType}
                    >
                      {({ energySelected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              energySelected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {carType.name}
                          </span>
                          {energySelected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-emerald-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <div className="w-72 flex flex-col gap-1.5">
          <label htmlFor="kilometers">Kilomètres / ans :</label>
          <input
            type="number"
            placeholder="Kilomètres"
            value={10000}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-transparent"
            onChange={(e) => setKilometers(Number.parseInt(e.target.value))}
          />
        </div>
        <div className="w-72 flex flex-col gap-1.5">
          <label htmlFor="year">Année :</label>
          <input
            type="number"
            value={2023}
            placeholder="Année"
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-transparent"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="w-72 flex flex-col gap-1.5">
          <h2 className="text-2xl font-bold">Résultat :</h2>
          <div className="w-72 rounded-lg border border-emerald-500 h-32 bg-emerald-100 flex justify-center items-center">
            <h2 className="text-2xl font-bold text-emerald-600">
              {finalResult}%
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}
