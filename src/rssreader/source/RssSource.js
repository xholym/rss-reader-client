import React from 'react'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { rssSource } from '../store/state'

function RssSource({ source, setSource, className }) {

    return (
        <Form.Control placeholder='RSS Source URL'
                      defaultValue={source}
                      className={className}
                      onChange={e => {
                          if (e.target == null)
                              return
                          setSource(e.target.value)
                      }}/>
    )
}

const stateToProps = state => ({
    source: state.article.source
})

const dispatchToProps = dis => ({
    setSource: url => dis(rssSource(url))
})

export default connect(
    stateToProps,
    dispatchToProps
)(RssSource)