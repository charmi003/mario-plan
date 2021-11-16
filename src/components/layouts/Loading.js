import React from 'react'

const Loading = () => {
    return (
        <div className="w-24 mx-auto my-12">
            <img src={`${process.env.PUBLIC_URL}/loading.gif`} alt="loading gif"></img>
        </div>
    )
}

export default Loading
