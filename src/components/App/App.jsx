import { Select, Input, Range, Pagination } from 'fwt-internship-uikit'
import { useEffect, useRef, useState } from 'react'
import { apiFetch, delay } from '../../utils/api';
import { replaceTitleByRef } from '../../utils/auxiliary';
import { PICS_FOR_PAGE, SYSTEM_AUTHOR_VAR, SYSTEM_LOCATION_VAR } from '../../utils/config';
import Header from '../Header/Header';
import ListPictures from '../ListPictures/ListPictures';
import Loader from '../Loader/Loader';
import Close from '../Close/Close';

function App() {
  // Massives
  const [list, setList] = useState([])
  const [preOut, setPreOut] = useState([])
  const [out, setOut] = useState([])

  // Aux State
  const [theme, setTheme] = useState('dark')
  const [loading, setLoading] = useState(true)
  const [authors, setAuthors] = useState([])
  const [locations, setLocations] = useState([])

  // Filters
  const [name, setName] = useState('')
  const [author, setAuthor] = useState(SYSTEM_AUTHOR_VAR)
  const [location, setLocation] = useState('Location')
  const [page, setPage] = useState(1)
  const [from, setFrom] = useState('')
  const [before, setBefore] = useState('')

  // Aux Vars
  const createdRange = useRef(null)
  const isDarkReverse = theme === 'dark' ? 'white' : 'dark'
  const isDarkBool = theme === 'dark' ? true : false

  const changeTheme = () => {
    setTheme(isDarkReverse)
  }
  const applyFilters = () => {
    let updatedList = list;
    if (name) {
      updatedList = updatedList.filter(item => item.name.toLowerCase().search(name.toLocaleLowerCase().trim()) !== - 1)
    }
    if (author !== SYSTEM_AUTHOR_VAR) {
      updatedList = updatedList.filter(item => item.authorName.toLowerCase().search(author.toLocaleLowerCase().trim()) !== - 1)
    }
    if (location !== SYSTEM_LOCATION_VAR) {
      updatedList = updatedList.filter(item => item.locationName.toLowerCase().search(location.toLocaleLowerCase().trim()) !== - 1)
    }
    if (before !== '' && from !== '') {
      const numFrom = parseInt(from)
      const numBefore = parseInt(before)
      if (numBefore > numFrom) {
        updatedList = updatedList.filter(item => {
          return item.created >= numFrom && item.created <= numBefore
        })
      }
    }
    const preOut = updatedList
    if (page) {
      const indexLast = page * PICS_FOR_PAGE
      const indexFirst = indexLast - PICS_FOR_PAGE
      updatedList = updatedList.slice(indexFirst, indexLast)
    }
    setPreOut(preOut)
    setOut(updatedList);
  }

  // Fetch paintings, locations, authors, merge into one object 
  useEffect(() => {
    async function fetchPictures() {
      const list = await apiFetch('paintings')
      const authors = await apiFetch('authors')
      const locations = await apiFetch('locations')

      const summaryList = list.map(item => {
        const author = authors.find(author => author.id === item.authorId)
        const location = locations.find(location => location.id === item.locationId)
        if (author) {
          item.authorName = author.name
        }
        if (location) {
          item.locationName = location.location
        }
        return item
      })

      const remadeLocations = locations.map(i => {
        return { id: i.id, name: i.location }
      })

      setAuthors(authors)
      setLocations(remadeLocations)
      setList(summaryList)

      delay(1000)
        .then(() => setLoading(false))
    }
    fetchPictures()

    // For make label: Created Range
    if (createdRange.current) {
      replaceTitleByRef(createdRange, '.Range__title', 'Created')
    }
  }, [])

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, list, author, location, from, before, page]);

  return (
    <div className="container">
      <div className="wrapper">
        <main>
          <Header changeTheme={changeTheme} theme={theme}></Header>
          <div className="Painting__group">
            <div className='relative'>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
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

            <div className='relative'>
              <Select
                value={author}
                options={authors}
                isDarkTheme={isDarkBool}
                onChange={(name) => setAuthor(name)}
              >
              </Select>
              {
                author !== SYSTEM_AUTHOR_VAR
                  ? <Close onClick={() => setAuthor(SYSTEM_AUTHOR_VAR)}></Close>
                  : null
              }

            </div>

            <div className='relative'>
              <Select
                value={location}
                options={locations}
                isDarkTheme={isDarkBool}
                onChange={(n) => setLocation(n)}
              >
              </Select>
              {
                location !== SYSTEM_LOCATION_VAR
                  ? <Close onClick={() => setLocation(SYSTEM_LOCATION_VAR)}></Close>
                  : null
              }
            </div>


            <div className='relative' ref={createdRange} >
              <Range
                isDarkTheme={isDarkBool}
                onClose={Function.prototype}
              >
                <Input
                  type={'number'}
                  className='Range__Input Range__Input--white'
                  placeholder='from'
                  isDarkTheme={isDarkBool}
                  onBlur={(e) => setFrom(e.target.value)}
                  min={0}
                  defaultValue={from}
                >

                </Input>
                <span className='Painting__delimiter'>-</span>
                <Input
                  type={'number'}
                  className='Range__Input Range__Input--white'
                  placeholder='before'
                  isDarkTheme={isDarkBool}
                  onChange={(e) => setBefore(e.target.value)}
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
          {
            loading
              ? <Loader color={theme}></Loader>
              : (
                <ListPictures list={out}></ListPictures>
              )
          }
        </main>
        <div className="footer">
          <div className='Pictures__Pagination'>
            <Pagination
              isDarkTheme={isDarkBool}
              pagesAmount={Math.ceil(preOut.length / PICS_FOR_PAGE)}
              currentPage={page}
              className='Pagination'
              onChange={(n) => setPage(n)}
            >
            </Pagination>
          </div>
        </div>
      </div >
    </div>
  );
}

export default App;
