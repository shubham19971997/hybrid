import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'
import './detail.css'

function Detail() {
  const location = useLocation()
  const { ID } = location.state
  const [post, setPost] = useState()
  const [objid, setObjid] = useState(ID)
  const [show, setShow] = useState(false)
  const allComments = []
  useEffect(() => {
    if (ID) {
      axios
        .get(`https://hn.algolia.com/api/v1/items/${objid}`)
        .then(({ data }) => {
          setPost(data)
          setShow(true)
        })
    }
  }, [ID])

  function comments({ children }) {
    allComments.push(children)
    children.forEach((child) => comments(child))
  }
  return (
    <div>
      {show ? (
        <div className='post'>
          {comments(post)}
          <div className='post-header'>
            <h2>Title: {post.title}</h2>
            <h3>Points: {post.points}</h3>
            <button>
              <Link to='/'>HomePage</Link>
            </button>
          </div>
          <h4>Comments</h4>
          {allComments.map(function (Comments) {
            return Comments.map((comment) => (
              <div
                dangerouslySetInnerHTML={{ __html: comment.text }}
                className='comment'
              ></div>
            ))
          })}
        </div>
      ) : (
        <p>Waiting for API to respond...</p>
      )}
    </div>
  )
}

export default Detail
