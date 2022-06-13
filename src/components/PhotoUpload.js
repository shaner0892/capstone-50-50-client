import React, { useState } from "react"
import { Button } from "reactstrap"

export default function UploadImages({obj, update}) {
    // change this to an array
    const [uploadedImage, setUploadedImage] = useState("")

    const checkUploadResult = (resultEvent) => {
        if (resultEvent.event === "success") {
            const copy = {...obj}
            copy.imageURL = resultEvent.info.secure_url
            update(copy)
            setUploadedImage(`${resultEvent.info.original_filename}.${resultEvent.info.format}`)
        }
    }

    const showWidget = (e) => {
        e.preventDefault()
        let widget = window.cloudinary.createUploadWidget({cloudName: "dfxsl6a2c", uploadPreset: "tb942fag"}, (error, result) => {checkUploadResult(result)})
        widget.open()
    }

    return (
        <>
            <Button id="uploadBtn" color="success" outline type="file" onClick={showWidget} >Upload an image</Button>
            <p>{uploadedImage}</p>
        </>
    )
}