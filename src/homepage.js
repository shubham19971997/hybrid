import React, { useState } from 'react'
import axios from 'axios'
import './homepage.css'
import { Link } from 'react-router-dom'

function Homepage() {
  const [query, setQuery] = useState('')
  const [hits, setHits] = useState([])
  function searchThis(e) {
    e.preventDefault()
    axios
      .get(`https://hn.algolia.com/api/v1/search?query=${query}`)
      .then(({ data }) => {
        setHits(data.hits)
      })
      setQuery('');
  }
  return (
    <div>
      <div className='navbar'>
        <div className='navbar-search'>
          <input onChange={(e) => setQuery(e.target.value)} placeholder='Type Something here...' />
          <button onClick={searchThis}>Search</button>
          {/* <button><Link to="/detail">Go To</Link></button> */}
        </div>
      </div>
      <div className='card-container'>
        {hits &&
          hits.map((hit) => {
            return (
              <div className='card' key={hit.objectID}>
                <p>Author: {hit.author}</p>
                <p>Points: {hit.points}</p>
                <h5>{hit.title}</h5>
                <button>
                  <Link to='/detail' state={{ ID: hit.objectID }}>
                    Post Detail
                  </Link>
                </button>
                <a href={hit.url} target='_blank'>visit url</a>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Homepage
