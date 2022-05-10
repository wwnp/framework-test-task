import React from 'react'
import { mainUrl } from '../../utils/api'
import placeholderImg from '../../assets/placeholderImg.jpg'

export const ListPictures = ({ list }) => {
  if (list.length === 0) {
    return <h1>No paintings</h1>
  }
  return (
    <div className="Paintings__grid">
      {list.map((item, index) => {
        const imageUrl = mainUrl + item?.imageUrl
        const name = item?.name ?? null
        const created_at = item?.created ?? null
        const location = item?.location?.title ?? null
        const author = item?.authorName ?? null
        return (
          <div
            className='Paintings__wrapper'
            key={index}
          >
            <img
              className="Paintings__picture"
              src={imageUrl}
              alt={name}
              height={275}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src = placeholderImg
              }}
            />
            <div className='Paintings__titleBlock'>
              <h4 className='Paintings__title'> {name} </h4>
              {author && (<p>Author: <span>{author}</span></p>)}
              {name && (<p>Name: <span>{name}</span></p>)}
              {created_at && (<p>Created: <span>{created_at}</span></p>)}
              {location && (<p>Location: <span>{location}</span></p>)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default ListPictures