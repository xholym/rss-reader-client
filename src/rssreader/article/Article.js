import React from 'react'
import { Button } from 'react-bootstrap'

const Img = ({ from }) => {
    if (!from || !from.type.includes('image'))
        return <div/>

    return (
        <div className='text-center mb-3'>
            <img src={from.url} alt={`${from.title}`}/>
        </div>
    )
}

const pad = val => val < 10 ? '0' + val : val

const formatDate = d => {
    const _ = pad
    return `${_(d.getUTCDate())}.${_(d.getUTCMonth() + 1)}.${d.getUTCFullYear()} - ${_(d.getUTCHours())}:${_(d.getUTCMinutes())}`
}

function Article({ description, link, pubDate, enclosure }) {
    return (
        <div>
            <Img from={enclosure}/>
            <p dangerouslySetInnerHTML={{ __html: description }}>
            </p>
            <Button variant='dark' target='_blank' href={link}>
                Full Article
            </Button>
            <hr className='mb-0'/>
            <p className='pub-date'>
                {formatDate(pubDate)}
            </p>
        </div>
    )
}

export default Article