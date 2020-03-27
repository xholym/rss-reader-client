import React from 'react'
import { Button } from 'react-bootstrap'

const Img = ({ from }) => {
    if (!from.enclosure || !from.enclosure.type.includes('image'))
        return

    return (
        <div className="text-center mb-3">
            <img src={from.enclosure.url} alt={`${from.title}`}/>
        </div>
    )
}

function Article({ data }) {
    const a = data

    return (
        <div>
            <Img from={data}/>
            <p>{a.description}</p>
            <Button variant="dark" target="_blank" href={a.link}>
                Full Article
            </Button>
            <hr className="mb-0"/>
            <p className="pub-date">
                {a.pubDate}
            </p>
        </div>
    )
}

export default Article