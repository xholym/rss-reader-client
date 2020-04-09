import React from 'react'
import { Accordion, Alert, Button, Card, ListGroup, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setDetail } from '../store/state'
import Article from './Article'

function ArticleList({ error, pending, articles, selected, select }) {

    if (error)
        return <Alert key='error' variant='warning'>
            Could not load Articles from Source
        </Alert>
    if (pending)
        return <Spinner animation='border'/>

    return (
        <ListGroup variant='blank'>
            {articles && articles.map((a, i) =>
                <Accordion as={ListGroup.Item} key={i}>
                    <Card className='no-border'>
                        <Accordion.Toggle className='article-title square-border no-border' as={Button} variant='light'
                                          eventKey={a.id}
                                          onClick={() => select(a)}>
                            {a.title}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={a.id}>
                            <div>
                                {
                                    a === selected
                                    && <Card.Body className='article-bg'>
                                        <Article {...a}/>
                                    </Card.Body>
                                }
                            </div>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            )}
        </ListGroup>
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