import React from 'react'

const ImageUpload = () => {
  return (
    <form action="/api/user/avatar" enctype="multipart/form-data" method="post">
        <input type="file" name="avatar"/>
        <button type="submit">Upload</button>
    </form>
  )
}

export default ImageUpload