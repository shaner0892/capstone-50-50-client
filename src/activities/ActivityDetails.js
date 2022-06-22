import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Button } from "reactstrap";
import { getCurrentUser } from "../users/UserManager";
import { getReviews } from "../reviews/ReviewManager";
import { EditActivity } from "./EditActivity";
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
    //define a function to delete a dog from the user's profile
    //invoke the DELETE method from ApiManager and then fetch the user's new list of dogs
    const removeActivity = (id) => {
        deleteActivity(id)
            .then(() => history.push(`/all-activities`))
    }
    
    return (
        <>
            <h2>{activity.title}</h2>
            <section className="activityProfile" key={`activity--${activity.id}`}> 
                <div>Location: {activity.city}, {activity.state?.postal_abbreviation}</div>
                <div>Category: {activity.category?.name}</div>
                <div>Average Rating: 
                    <ReactStars 
                        className="stars"
                        count={5}
                        isHalf={true}
                        edit={false}
                        value={activity.average_rating}
                        size={24}
                        activeColor="#ffd700"
                    />
                {/* if staff, allow them to delete the activity */}
                {
                    user.user?.is_staff ? <div>
                        <Button id="btn" color="warning"  outline onClick={() => removeActivity(activity.id)} >Delete This Activity</Button>
                    </div> : ""
                }
                </div>
                <Button className="rightBtn" color="success" outline onClick={() => history.push(`/review-activity/${activity.id}`)} >Add a Review</Button>
            </section>
            {/* display reviews here */}
            <section className="reviews">
                {
                    reviews.map((r) => {
                        return <div className="review">"{r.review}"
                            <ReactStars 
                                className="stars"
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
