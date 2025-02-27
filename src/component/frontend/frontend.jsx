import React from 'react'
import Char from '../../assets/frontend_char.png'
import FrontendChart from './frontend-chart'

const frontend = () => {
  return (
    <div className='mt-16'>
      <img className='w-[20rem] absolute z-[-1] opacity-70' src={Char} alt="frontend_char" />
      <FrontendChart/>
    </div>
  )
}

export default frontend
