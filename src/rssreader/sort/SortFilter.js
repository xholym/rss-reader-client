import React, { useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap'
import { sort as ArticleSort } from '../store/state'
import { connect } from 'react-redux'
import { noOrder, SortType } from '../store/sort'

const { asc, des } = SortType
const appSortOptions = [
    { label: 'Newest', order: { target: 'pubDate', type: des } },
    { label: 'Oldest', order: { target: 'pubDate', type: asc } }
]

const orderToStr = o => `${o.target}-${o.type}`

const strToOrder = str => {
    const s = str.split('-')
    return {
        target: s[0],
        type: s[1],
    }
}

function SortFilter({ doSortBy, className }) {

    const [orderVal, setOrderVal] = useState(orderToStr(noOrder))
    const getOrder = () => strToOrder(orderVal)

    return (
        <FormGroup className={className}>
            <Form.Label className="mr-3 mt-auto mb-auto">
                Sort By:
            </Form.Label>
            <Form.Control className="w-max-content mr-3" as="select" defaultValue={orderVal}
                          onChange={e => {
                              if (!e.target)
                                  return
                              setOrderVal(e.target.value)
                          }}>
                {
                    appSortOptions.map(
                        ({ label, order }, i) =>
                            <option key={i} value={orderToStr(order)}>
                                {label}
                            </option>
                    )
                }
            </Form.Control>
            <Button className="mr-3" variant="dark"
                    onClick={() => {
                        doSortBy(getOrder())
                    }}>
                Sort
            </Button>
        </FormGroup>
    )
}

const dispatchToProps = dis => ({
    doSortBy: order => dis(ArticleSort.sortBy(order))
})

export default connect(
    null,
    dispatchToProps
)(SortFilter)