import React from 'react'

const ImageUpload = () => {
  return (
    <form action="http://localhost:3000/user/avatar" enctype="multipart/form-data" method="post">
        <input type="file" name="avatar"/>
        <button type="submit">Upload</button>
    </form>
  )
}

export default ImageUpload