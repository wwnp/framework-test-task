import { Pagination } from 'fwt-internship-uikit'
import { useEffect, useRef, useState } from 'react'
import { apiFetch, delay } from '../../utils/api';
import { replaceTitleByRef } from '../../utils/auxiliary';
import { PICS_FOR_PAGE, SYSTEM_AUTHOR_VAR, SYSTEM_LOCATION_VAR } from '../../utils/config';
import Header from '../Header/Header';
import ListPictures from '../ListPictures/ListPictures';
import Loader from '../Loader/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import Filter from '../Filter/Filter';
import './style.App.css'
const queryString = require('query-string');

function App() {
  // Parse from browser address line
  const locationUrl = useLocation()
  const locationSearch = queryString.parse(locationUrl.search)

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
  const [name, setName] = useState(locationSearch.name || '')
  const [author, setAuthor] = useState(locationSearch.author || SYSTEM_AUTHOR_VAR)
  const [location, setLocation] = useState(locationSearch.location || 'Location')
  const [page, setPage] = useState(locationSearch.page || 1)
  const [from, setFrom] = useState(locationSearch.created ? locationSearch.created.split('-')[0] : '')
  const [before, setBefore] = useState(locationSearch.created ? locationSearch.created.split('-')[1] : '')

  // Aux Vars
  const createdRange = useRef(null)
  const darkReverse = theme === 'dark' ? 'white' : 'dark'
  const isDarkBool = theme === 'dark' ? true : false

  const navigate = useNavigate()

  const changeTheme = () => {
    setTheme(darkReverse)
  }

  const applyFilters = () => {
    let outUrl = `?page=${page}`
    let updatedList = list;

    if (name) {
      outUrl += `&name=${name.toLocaleLowerCase()}`
      updatedList = updatedList.filter(item => {
        return item.name.toLowerCase().search(name.toLocaleLowerCase().trim()) !== - 1
      })
    }
    if (author !== SYSTEM_AUTHOR_VAR) {
      outUrl += `&author=${author.toLocaleLowerCase()}`
      updatedList = updatedList.filter(item => item.authorName.toLowerCase().search(author.toLocaleLowerCase().trim()) !== - 1)
    }
    if (location !== SYSTEM_LOCATION_VAR) {
      outUrl += `&location=${location.toLocaleLowerCase()}`
      updatedList = updatedList.filter(item => item.locationName.toLowerCase().search(location.toLocaleLowerCase().trim()) !== - 1)
    }
    if (before !== '' && from !== '') {
      outUrl += `&created=${from}-${before}`
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
    navigate(outUrl)
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

      delay(5000)
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
          <Filter
            name={name}
            setName={setName}
            setPage={setPage}
            isDarkBool={isDarkBool}
            author={author}
            setAuthor={setAuthor}
            authors={authors}
            location={location}
            locations={locations}
            setLocation={setLocation}
            createdRange={createdRange}
            setFrom={setFrom}
            from={from}
            before={before}
            setBefore={setBefore}
          >
          </Filter>
          {
            loading
              ? <Loader color={theme}></Loader>
              : (
                <ListPictures list={out}></ListPictures>
              )
          }
        </main>
        <div className="footer">
          <div className='footer__Pagination'>
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
