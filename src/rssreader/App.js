import React from 'react';
import './App.sass';
import 'bootstrap/dist/css/bootstrap.min.css'
import RssSource from './source/RssSource'
import { applyMiddleware, compose, createStore } from 'redux'
import reducers from './store/reducers'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Col, Container, Form, Nav, Navbar, Row } from 'react-bootstrap'
import FetchBtn from './source/FetchBtn'
import ArticleList from './article/ArticleList'
import SortFilter from './sort/SortFilter'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
    reducers,
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
                        <Form as={Col} xs="12" className="pl-5 pr-5 pt-3 pb-3 sort-bg">
                            <SortFilter className="mt-auto mb-auto flex-line-left"/>
                        </Form>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <ArticleList/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Provider>
    )
}

export default App;
