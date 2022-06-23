import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Button } from "reactstrap";
import { getCurrentUser } from "../users/UserManager";
import { getReviews } from "../reviews/ReviewManager";
import { deleteActivity, getSingleActivity } from "./ActivityManager";
import "./Activity.css"


export const ActivityDetails = () => {
    //use the useState hook function to set the initial value of the new object
    const [activity, setActivity] = useState({})
    const [reviews, setReviews] = useState([])
    const history = useHistory()
    const {activityId} = useParams()
    const [user, setUser] = useState({})
    
    useEffect(
        () => {
            getSingleActivity(activityId)
                .then(setActivity)
            getReviews(activityId)
                .then(setReviews)
            getCurrentUser()
                .then(setUser)
        },
        []
    )

    //invoke the DELETE method from the manager and then push to activity list
    const removeActivity = (id) => {
        deleteActivity(id)
            .then(() => history.push(`/all-activities`))
    }
    
    // display title, picture, location, category, and avg rating
    return (
        <>
            <h2>{activity.title}</h2>
            <section className="activityProfile" key={`activity--${activity.id}`}> 
                <img className="activityPic" src={activity.url}/>
                <div><b>Location:</b> {activity.city}, {activity.state?.postal_abbreviation}</div>
                <div><b>Category:</b> {activity.category?.name}</div>
                <div className="avgRating"><b>Average Rating: </b> 
                    <ReactStars 
                        count={5}
                        isHalf={true}
                        edit={false}
                        value={activity.average_rating}
                        size={24}
                        activeColor="#ffd700"
                    />
                </div>
                {/* if the logged in user is staff, allow them to edit or delete the activity */}
                {
                    user.user?.is_staff ? <div>
                        <Button id="btn" color="success"  outline onClick={() => history.push(`/edit-activity/${activity.id}`)} >Edit This Activity</Button>
                        <Button id="btn" color="warning"  outline onClick={() => removeActivity(activity.id)} >Delete This Activity</Button>
                    </div> : ""
                }
                <Button className="btn" color="success" outline onClick={() => history.push(`/review-activity/${activity.id}`)} >Add a Review</Button>
            </section>
            {/* display reviews here */}
            <section className="reviews">
                {
                    reviews.map((r) => {
                        return <div className="review">"{r.review}"
                            <ReactStars 
                                count={5}
                                edit={false}
                                value={r.rating}
                                size={24}
                                activeColor="#ffd700"
                            />
                            {/* <div>From: {r.fifty_user?.user?.username}</div> */}
                        </div>
                    })
                }
            </section>
        </>
    )
}
