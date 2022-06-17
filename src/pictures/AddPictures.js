import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import UploadImages from "./PhotoUpload";
import { postTripPicture } from "./PictureManager";


export const AddPictures = () => {
    //use the useState hook function to set the initial value of the new object
    const history = useHistory()
    const { tripId } = useParams()

    //useState hook function sets the initial value of dog to the defined properties, updateDog is a function you invoke later on to modify the values
    const [tripPicture, setTripPicture] = useState({
        trip: tripId,
        image_url: ""
    });

    //this updates the state as the user makes changes
    //if they add an activity the id is pushed into the trip.activity array
    const updateTripPictureState = (evt) => {
        const newTripPictures = Object.assign({}, tripPicture)
        newTripPictures[evt.target.name] = evt.target.value
        setTripPicture(newTripPictures)
    }

    // // this posts the new activity when the user hits submit
    // const addNewTripPics = (evt) => {
    //     //capture the evt (event) and prevent the default (form submitted and reset) from happening
    //     evt.preventDefault()
    //     //object that we want to send to our API
    //     const newTripPic = {
    //         trip: tripId,
    //         image_url: tripPicture.image_url
    //     }

    //     // ******this push doesn't work, the ID hasn't been created yet
    //     postTripPicture(newTripPic)
    //         .then(() => history.push(`/trip-details/${tripId}`))
    // }

    // postTripPicture(copy)


    // //each time the user hits "add" activity we are adding the selected activity to display
    // const pushActivity = (evt) => {
    //     evt.preventDefault()
    //     let selectedActivities = activities.filter(activity => parseInt(trip.activity) === activity.id)
    //     // unpacking: taking the activity you just added and adding it to the activities that were already saved
    //     setTripActivities([...selectedActivities, ...tripActivities])
    // }

    // // this posts the new activity when the user hits submit
    // const addNewTrip = (evt) => {
    //     //capture the evt (event) and prevent the default (form submitted and reset) from happening
    //     evt.preventDefault()
    //     //object that we want to send to our API
    //     const newTripPicture = {
    //         trip: tripId,
    //         image_url: trip_picture.image_url
    //         // by mapping through you change it to an array of IDs
    //         // activity: tripActivities.map(tA => tA.id)
    //     }

    //     postTripPicture(newTripPicture)
    //         .then(() => history.push(`/trip-details/${tripId}`))
    // }
    
    //this will be the form you display, you need to capture user input and save to new object
    return (
        <form className="tripPictureForm">
            <h2 className="tripPictureForm__title">Add Pictures from your Trip</h2>
            <div className="form-group">
                <UploadImages isTripPicture={true} obj={tripPicture} update={setTripPicture} />
                {/* <button id="btn" outline className="btn btn-savePic" onClick={addNewTripPics} >Save</button><br></br> */}
                <button id="btn" outline className="btn btn-skip" onClick={() => history.push(`/trip-details/${tripId}`)} >Skip</button>
            </div>
        </form>
    )
}
