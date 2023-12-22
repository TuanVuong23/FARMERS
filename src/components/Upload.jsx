import React from 'react'
import { useState } from 'react'
import './Upload.css'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'

export const Upload = () => {
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState ('No selected file')
  return (
    <main className="main">
        <form action=''
        onClick={() => document.querySelector(".input-field").click()}>
            <input type='file' accept='image/*' className="input-field" hidden 
            onChange={({ target: {files}}) => {
                files[0] && setFileName(files[0].name)
                if(files) {
                    setImage(URL.createObjectURL(files[0]))
                }
            }}
            />

            {image ?
            <img src= {image} width = {360} height={260} alt={fileName} />
            :
            <>
            <MdCloudUpload color='#00563B' size={60} />
            <p>Browse Files to upload</p>
            </>
        }
        </form>

        <section className="upload-row">
            <AiFillFileImage color='#00563B' />
            <span className='upload-content'>
                {fileName}
                <MdDelete
                onClick={() => {
                    setFileName('No Selected File')
                    setImage(null)
                }}
                />
            </span>

        </section>

        
    </main>
  )
}
