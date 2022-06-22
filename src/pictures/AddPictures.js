import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import UploadImages from "./PhotoUpload";
import { postTripPicture } from "./PictureManager";
import "./Picture.css"


export const AddPictures = () => {
    //use the useState hook function to set the initial value of the new object
    const history = useHistory()
    const { tripId } = useParams()

    //useState hook function sets the initial value of dog to the defined properties, updateDog is a function you invoke later on to modify the values
    const [tripPicture, setTripPicture] = useState({
        trip: tripId,
        image_url: ""
    });

    // //this updates the state as the user makes changes
    // //if they add an activity the id is pushed into the trip.activity array
    // const updateTripPictureState = (evt) => {
    //     const newTripPictures = Object.assign({}, tripPicture)
    //     newTripPictures[evt.target.name] = evt.target.value
    //     setTripPicture(newTripPictures)
    // }

    
    //this will be the form you display, you need to capture user input and save to new object
    return (
        <form className="tripPictureForm">
            <h2 className="tripPictureForm__title">Add Pictures from your Trip</h2>
            <div className="form-group">
                <UploadImages isTripPicture={true} obj={tripPicture} update={setTripPicture} />
                <Button id="btn" color="success" outline onClick={() => history.push(`/trip-details/${tripId}`)} >Finish</Button><br></br>
            </div>
        </form>
    )
}
