import React from 'react';
import './App.sass';
import 'bootstrap/dist/css/bootstrap.min.css'
import RssSource from './rssreader/source/RssSource'
import { applyMiddleware, compose, createStore } from 'redux'
import appReducers from './rssreader/store/appReducers'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Col, Container, Form, Nav, Navbar, Row } from 'react-bootstrap'
import FetchBtn from './rssreader/source/FetchBtn'
import ArticleList from './rssreader/article/ArticleList'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
    appReducers,
    composeEnhancers(
        applyMiddleware(thunk),
    )
)

function App() {

    return (
        <Provider store={store}>
            <div className="App">
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>RSS Reader</Navbar.Brand>
                    <Nav className="flex-grow-1 justify-content-center">
                        <Nav.Item>
                            <Form inline>
                                <RssSource className="w-300px"/>
                                <FetchBtn/>
                            </Form>
                        </Nav.Item>
                    </Nav>
                </Navbar>
                <Container className="mt-5">
                    <Row>
                        <Col sm="12">
                            <ArticleList/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Provider>
    )
}

export default App;
