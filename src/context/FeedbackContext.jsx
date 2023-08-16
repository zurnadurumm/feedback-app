import { createContext, useState, useEffect } from "react";


const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    useEffect(() => {
        fetchFeedback();
    }, [])

    //fetch feedback from server

    const fetchFeedback = async () => {
        const response = await fetch(`/feedback`)

        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)
    }

    //set item to be update
    const updateFeedback = async (id, updatedItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
        })

        const data = await response.json()

        setFeedback(feedback.map((item) => item.id === id ? { ...item, ...data } : item))

    }


    //set item to be edited
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        })
    }

    //delete feedback

    const handleDelete = async (id) => {
        await fetch(`/feedback/${id}`, { method: 'DELETE' })
        const newData = feedback.filter((item) => item.id !== id)
        setFeedback(newData)
    }

    //add feedback

    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFeedback),
        })
        const data = await response.json()

        setFeedback([data, ...feedback])

    }

    return (
        <FeedbackContext.Provider
            value={{
                feedback,
                feedbackEdit,
                isLoading,
                deleteFeedback: handleDelete,
                addFeedback,
                editFeedback,
                updateFeedback,

            }}
        >
            {children}
        </FeedbackContext.Provider>
    );
};
export default FeedbackContext;
