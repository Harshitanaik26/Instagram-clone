import React from 'react'
import Avatar from '@mui/material/Avatar';
import './Post.css'

function Post({ username , caption , imgUrl }) {
  return (
    <div className="post">
      <div className="post-header">
         <Avatar className="post_avatar"
        alt="Image not available"
        src="images/blackpinkconcertalbum.jpeg"/>
        <h3>{username}</h3>
        {/* header - username -> avatar*/}
      </div>
        <img className="post-image" src={imgUrl} alt="Image isnt available"/>
        {/*image */}

        <h4 className="post-text"><strong>{username}</strong>: {caption} </h4>
        {/*username -> caption */}
    </div>
  )
}

export default Post