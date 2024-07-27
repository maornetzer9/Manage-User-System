import React from 'react'
import { motion } from 'framer-motion'
import { headContainerAnimation, headTextAnimation, slideAnimation } from '../utilities/motion'
import '../layout/navbar.css'

export default function Navbar( { handleSearch = () => {}, handlePreviewNewPost = () => {} } ) {
  return (
    <motion.div {...headContainerAnimation} style={{textAlign:'center'}}>
         <motion.h1 
            {...headTextAnimation}
        >
            Search
        </motion.h1>

        <motion.div 
            className="search-form"
            {...slideAnimation('left')} 
        >
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearch}
                />
                <button onClick={() => handlePreviewNewPost(true)}> Add </button>
            </motion.div>
            
    </motion.div>
  )
}
