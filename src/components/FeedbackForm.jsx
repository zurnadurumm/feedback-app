import React from 'react'
import Card from './shared/Card'
import { useState, useContext, useEffect } from 'react'
import Button from './Button'
import Rating from './Rating'
import FeedbackContext from '../context/FeedbackContext'




function FeedbackForm() {


    const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)
    const [text, setText] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')
    const [rating, setRating] = useState(0)

    useEffect(() => {
        if (feedbackEdit.edit === true) {
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

    const handleTextChange = (e) => {
        const newText = e.target.value
        setText(() => {
            return newText

        })
        if (text === '') {
            setBtnDisabled(true)
            setMessage('')
        }
        else if (text !== '' && text.trim().length <= 10) {
            setBtnDisabled(true)
            setMessage('Text must be at least 10 characters')
        }

        else {
            setMessage(null)
            setBtnDisabled(false)
        }





    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim().length > 10) {
            const newFeedback = {
                text,
                rating,



            }
            if (feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
            }
            else {
                addFeedback(newFeedback)
            }

            setText('')
        }
    }


    return (
        <Card>
            <form onSubmit={handleSubmit} >
                <h2>How would you rate our services?</h2>
                <Rating select={(rating) => { setRating(rating) }} />
                <div className="input-group">
                    <input onChange={handleTextChange} type="text" placeholder='Write a review' value={text} />
                    <Button type="submit" isDisabled={btnDisabled}  >Send</Button>

                </div>
                {message && <div className="message">{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm