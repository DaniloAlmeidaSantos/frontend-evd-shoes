import React from 'react';
import './PaginationComponent.css'

const PaginationComponent = ({ setCurrentPage, pages, currentPage }) => {
    return (
        <div className='group-pagination'>
            {pages > 1 ?
                Array.from(Array(pages), (item, index) => {
                    return (
                    <button 
                        style={currentPage === index ? {backgroundColor: 'gray'} : null} 
                        value={index} 
                        onClick={(e) => setCurrentPage(Number(e.target.value))}>
                        {index + 1}
                    </button>)
                }) : <></>
            }
        </div>
    );
}

export default PaginationComponent;