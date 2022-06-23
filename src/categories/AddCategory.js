import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { deleteCategory, getCategories, postCategory } from "./CategoryManager";
import './Category.css'

// this page is only viewable by staff

export const AddCategory = () => {
    //use the useState hook function to set the initial value
    const [categories, setCategories] = useState([])
    
    useEffect(
        () => {
            getCategories()
                .then(setCategories)
        },
        []
    )
    
    //useState hook function sets the initial value of the category to an empty string, setCategory is a function you invoke later on to modify the value
    const [category, setCategory] = useState({
        name: "",
    });

    const updateCategory = (evt) => {
        const newCategory = Object.assign({}, category)
        newCategory[evt.target.name] = evt.target.value
        setCategory(newCategory)
    }

    const addNewCategory = (evt) => {
        //capture the evt (event) and prevent the default (form submitted and reset) from happening
        evt.preventDefault()
        //object that we want to send to our API
        const newCategory = {
            name: category.name
        }
        // not the ideal way to rest form input, but clearing state wouldn't work : try useRef()
        document.getElementById("categoryForm").reset();
        
        postCategory(newCategory)
            .then(()=>
                getCategories()
                    .then(setCategories))
    }

        //define a function to delete a dog from the user's profile
    //invoke the DELETE method from ApiManager and then fetch the user's new list of dogs
    const removeCategory = (id) => {
        deleteCategory(id)
            .then(() => getCategories()
                .then(setCategories))
    }
    
    //this will be the form you display, you need to capture user input and save to new object
    return (
        <>
        <form id="categoryForm">
            <fieldset>
                <div className="form-group">
                    <label> Add a New Category: </label>
                    <input name="name" className="form-control"
                        onChange={updateCategory}
                        /> 
                    </div>
            </fieldset>
            <div>
                <Button id="btn" color="success" outline className="btn btn-addCategory" onClick={addNewCategory} >Add</Button>
            </div>
        </form>
        <div className="categoryList">
        <h5>Category List</h5> 
        {
            categories.map((c) => {
                return <div className="category"><li>{c.name}</li>
                <Button id="leftBtn" color="warning"  outline onClick={() => removeCategory(c.id)} >Delete</Button>
                </div>
            })
            
        }
        </div>
        </>
    )
}
