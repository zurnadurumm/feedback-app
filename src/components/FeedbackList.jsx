import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FeedbackItem from './FeedbackItem'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'


function FeedbackList() {
    const { feedback } = useContext(FeedbackContext)


    if (!feedback || feedback.length === 0) return (<div>No feedback data</div>)
    return (
        <div className='feedback-list'>
            <AnimatePresence>
                {feedback.map((item) => {
                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <FeedbackItem key={item.id} item={item} />
                        </motion.div>
                    )
                })
                }
            </AnimatePresence>
        </div>
    )
}



export default FeedbackList