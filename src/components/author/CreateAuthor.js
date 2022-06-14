import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createAuthor } from "./AuthorManager";

export const CreateAuthor = () => {
    const [form, updateForm] = useState({ name: "" })
    const history = useHistory()

    const submitAuthor = (e) => {
        e.preventDefault()
        const newAuthor = {
            name: form.name
        }
        createAuthor(newAuthor)
            .then(() => history.push(`/authors`))
    }

    return (
        <>
            <fieldset>
                <div className="form-group">
                    <input required type="text" id="name" className="form-control" placeholder="Author name"
                        value={form.name}
                        onChange={
                            (e) => {
                                const copy = { ...form }
                                copy.name = e.target.value
                                updateForm(copy)
                            }
                        }
                    />
                </div>
            </fieldset>

            <div className="submitButton">
                <button className="submit-button"
                    onClick={(e) => {
                        submitAuthor(e)
                        updateForm({ name: "" })
                    }}>
                Add Author</button>
            </div>
        </>
    )
}