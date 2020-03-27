import React from 'react'
import { Accordion, Alert, Button, Card, ListGroup, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setDetail } from './articleState'
import Article from './Article'

function ArticleList({ error, pending, articles, selected, select }) {

    if (error)
        return <Alert key='error' variant='warning'>
            Could not load Articles from Source
        </Alert>
    if (pending)
        return <Spinner animation="border"/>

    return (
        <div className="list-group-blank">
            {articles && articles.map(a =>
                <Accordion as={ListGroup.Item} key={a.id}>
                    <Card>
                        <Accordion.Toggle className="article-title" as={Button} variant="light" eventKey={a.id}
                                          onClick={() => select(a)}>
                            {a.title}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={a.id}>
                        <span>
                            {a === selected && <Card.Body> <Article data={a}/> </Card.Body>}
                        </span>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            )}
        </div>
    )
}

const stateToProps = state => ({
    error: state.article.error,
    pending: state.article.pending,
    articles: state.article.list,
    selected: state.article.detail
})


const dispatchToProps = dis => ({
    select: a => dis(setDetail(a))
})

export default connect(
    stateToProps,
    dispatchToProps
)(ArticleList)