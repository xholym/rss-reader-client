import React from 'react'
import { Button } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { list as ArticleList } from '../store/state'
import { connect } from 'react-redux'
import { MdGetApp } from 'react-icons/md'

function FetchBtn({ source, fetch }) {

    return (
        <Button variant='dark' onClick={() => fetch(source)}>
            <MdGetApp/> Load
        </Button>
    )
}

const stateToProps = state => ({
    source: state.article.source
})

const dispatchToProps = dis =>
    bindActionCreators({ fetch: ArticleList.doFetch }, dis)

export default connect(
    stateToProps,
    dispatchToProps
)(FetchBtn)