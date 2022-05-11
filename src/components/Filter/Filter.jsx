import { Input, Range, Select } from 'fwt-internship-uikit'
import React from 'react'
import { SYSTEM_AUTHOR_VAR, SYSTEM_LOCATION_VAR } from '../../utils/config'
import Close from '../Close/Close'
import './style.Filter.css'

const Filter = ({
  name,
  setName,
  setPage,
  isDarkBool,
  author,
  setAuthor,
  authors,
  location,
  locations,
  setLocation,
  createdRange,
  setFrom,
  from,
  before,
  setBefore
}) => {
  return (
    <div className="filter__group filter">
      <div className='filter__item'>
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setPage(1)
          }}
          placeholder='Name'
          isDarkTheme={isDarkBool}
        >
        </Input>
        {
          name !== ''
            ? <Close onClick={() => setName('')}></Close>
            : null
        }
      </div>

      <div className='filter__item'>
        <Select
          value={author}
          options={authors}
          isDarkTheme={isDarkBool}
          onChange={(name) => {
            setAuthor(name)
            setPage(1)
          }}
        >
        </Select>
        {
          author !== SYSTEM_AUTHOR_VAR
            ? <Close onClick={() => setAuthor(SYSTEM_AUTHOR_VAR)}></Close>
            : null
        }

      </div>

      <div className='filter__item'>
        <Select
          value={location}
          options={locations}
          isDarkTheme={isDarkBool}
          onChange={(n) => {
            setLocation(n)
            setPage(1)
          }}
        >
        </Select>
        {
          location !== SYSTEM_LOCATION_VAR
            ? <Close onClick={() => setLocation(SYSTEM_LOCATION_VAR)}></Close>
            : null
        }
      </div>


      <div className='filter__item' ref={createdRange} >
        <Range
          isDarkTheme={isDarkBool}
          onClose={Function.prototype}
        >
          <Input
            type={'number'}
            className='Range__Input Range__Input--white'
            placeholder='from'
            isDarkTheme={isDarkBool}
            onBlur={(e) => {
              setFrom(e.target.value)
              setPage(1)
            }}
            min={0}
            defaultValue={from}
          >

          </Input>
          <span className='painting__delimiter'>-</span>
          <Input
            type={'number'}
            className='Range__Input Range__Input--white'
            placeholder='before'
            isDarkTheme={isDarkBool}
            onChange={(e) => {
              setBefore(e.target.value)
              setPage(1)
            }}
            max={parseInt(new Date().getFullYear())}
            defaultValue={before}
            on
          >
          </Input>
        </Range>
        {
          before !== '' && from !== ''
            ? <Close onClick={() => {
              setFrom('')
              setBefore('')
            }}></Close>
            : null
        }

      </div>

    </div>
  )
}

export default Filter