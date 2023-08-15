import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid'


const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: "This is a test feedback",
            rating: 6,
        },
        {
            id: 2,
            text: "This is a test feedback 2",
            rating: 1,
        },
        {
            id: 3,
            text: "This is a test feedback 3",
            rating: 10,
        },
    ]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })
    //set item to be update
    const updateFeedback = (id, updatedItem) => {
        setFeedback(feedback.map((item) => item.id === id ? { ...item, ...updatedItem } : item))

    }


    //set item to be edited
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        })
    }

    //delete feedback

    const handleDelete = (id) => {
        const newData = feedback.filter((item) => item.id !== id)
        setFeedback(newData)
    }

    //add feedback

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])

    }

    return (
        <FeedbackContext.Provider
            value={{
                feedback,
                feedbackEdit,
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
