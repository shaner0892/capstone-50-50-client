import React, { useState, useEffect } from "react"
import { Button } from "reactstrap";
import { deleteCategory, getCategories, postCategory } from "./CategoryManager";
import './Category.css'

// this page is only viewable by staff

export const AddCategory = () => {
    //use the useState hook function to set the initial value
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({
        name: "",
    });
    
    useEffect(
        () => {
            getCategories()
                .then(setCategories)
        },
        []
    )
    
    const updateCategory = (evt) => {
        const newCategory = Object.assign({}, category)
        newCategory[evt.target.name] = evt.target.value
        setCategory(newCategory)
    }

    // when the user hits submit, POST the category and get the new list of categories
    const addNewCategory = (evt) => {
        evt.preventDefault()
        //object that we want to send to our API
        const newCategory = {
            name: category.name
        }
        // not the ideal way to reset form input, but clearing state wouldn't work : try useRef()
        document.getElementById("categoryForm").reset();
        postCategory(newCategory)
            .then(()=>
                getCategories()
                    .then(setCategories))
    }

    //when the user hits delete invoke the DELETE method from manager and then fetch the new list of categories
    const removeCategory = (id) => {
        deleteCategory(id)
            .then(() => getCategories()
                .then(setCategories))
    }
    
    return (
        <>
        <form id="categoryForm">
            <fieldset>
                <div className="form-group">
                    <h3> Add a New Category: </h3>
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
        <h3><u>Category List:</u></h3> 
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
