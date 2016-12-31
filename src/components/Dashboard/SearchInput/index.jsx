import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { FormGroup, InputGroup, MenuItem, Grid, Col, Row, ControlLabel } from 'react-bootstrap'
import { Enum } from 'enumify'
import { formControlComponent, dropdownButtonComponent, datePickerComponent } from "../../../adapters"

class ResultType extends Enum {}
ResultType.initEnum(['mixed', 'recent', 'popular'])

let SearchInput = props => {
    const { resultType, handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <Grid>
                    <Row className="rtw-row">
                        <Col componentClass={ControlLabel} sm={1}>
                            Query
                        </Col>
                        <Col sm={11}>
                            <InputGroup>
                                <Field
                                    name="query"
                                    type="text"
                                    placeholder="e.g. &#x22;watching now&#x22; or movie -scary :) or @RobyJRodriguez"
                                    component={formControlComponent}
                                    />

                                <Field
                                    name="resultType"
                                    title="Result type"
                                    component={dropdownButtonComponent}
                                    >
                                    { ResultType.enumValues.map(value => <MenuItem key={value.name} eventKey={value.name}>
                                        <i className={resultType === value.name ? "glyphicon glyphicon-ok pull-right" : ""}></i> { value.name }
                                    </MenuItem>) }
                                </Field>
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row className="rtw-row">
                        <Col componentClass={ControlLabel} sm={1}>
                            Language
                        </Col>
                        <Col sm={11}>
                            <Field
                                name="language"
                                type="text"
                                placeholder="e.g. en - English or es - Spanish"
                                component={formControlComponent}
                                />
                        </Col>
                    </Row>

                    <Row className="rtw-row">
                        <Col componentClass={ControlLabel} sm={1}>
                            Until
                        </Col>
                        <Col sm={11}>
                            <Field
                                name="until"
                                dateFormat="YYYY-MM-DD"
                                component={datePickerComponent}
                                />
                        </Col>
                    </Row>

                    <Row className="rtw-row">
                        <Col sm={12}>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg btn-outline btn-rounded"
                                disabled={pristine || submitting}
                                > Search
                            </button>

                            <button
                                type="button"
                                className="btn btn-info btn-lg btn-outline btn-rounded"
                                disabled={pristine || submitting}
                                onClick={reset}
                                > Clear
                            </button>
                        </Col>
                    </Row>
                </Grid>
            </FormGroup>
        </form>
    )
}

// decorate with redux-form
SearchInput = reduxForm({
    form: 'searchInput'
})(SearchInput)

// decorate with connect
const selector = formValueSelector('searchInput')
SearchInput = connect(
    state => {
        const resultType = selector(state, 'resultType') || ResultType.mixed.name
        return {
            resultType,
            initialValues: { resultType }
        }
    }
)(SearchInput)

export default SearchInput
