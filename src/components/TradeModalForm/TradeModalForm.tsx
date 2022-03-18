import React from "react";
import {Formik, Field, Form} from 'formik';
import {useActions} from "core/hooks/useActions";
import {useTypedSelector} from "core/hooks/useTypedSelector";
import {TradeModalFormData, TradeModalFormErrors} from "core/interfaces/tradeModalForm";

import "./TradeModalForm.scss";

const enum ValidationErrorMessages {
    amountIsRequired = 'Please provide trade amount.',
    amountNotPositive = 'Trade amount should be positive number.',
    currencyIsRequired = 'Please provide trade currency.',
    currencyIncludesNumbers = 'Currency cannot include numbers.'
}

const TradeModalForm: React.FC = () => {
    const {addTrade} = useActions();
    const {isLoading} = useTypedSelector(state => state.trade);

    const validateForm = (values: TradeModalFormData) => {
        const errors: TradeModalFormErrors = {};
        if (!values.amount) {
            errors.amount = ValidationErrorMessages.amountIsRequired;
        } else if (values.amount < 0) {
            errors.amount = ValidationErrorMessages.amountNotPositive;
        } else if (!values.currency) {
            errors.currency = ValidationErrorMessages.currencyIsRequired;
        } else if (!/[^0-9]$/i.test(values.currency)) {
            errors.currency = ValidationErrorMessages.currencyIncludesNumbers;
        }
        return errors;
    };

    return (
        <Formik
            initialValues={{currency: '', amount: 0}}
            validate={validateForm}
            onSubmit={(values: TradeModalFormData, {setSubmitting}) => {
                addTrade(values);
                setSubmitting(false);
            }}
        >
            {({errors}) =>
                <Form className="trade-modal-form">

                    <div className='input-with-label'>
                        <label htmlFor="amount">
                            Amount
                        </label>

                        <Field
                            className={`text-field${errors.amount ? ' invalid' : ''}`}
                            type='number'
                            id="amount"
                            name="amount"
                            placeholder="Enter trade amount"
                            autoComplete='off'
                        />
                        {errors.amount && <div className='invalid-message'>{errors.amount}</div>}
                    </div>

                    <div className='input-with-label'>
                        <label htmlFor="currency">
                            Currency
                        </label>

                        <Field
                            className={`text-field${errors.currency ? ' invalid' : ''}`}
                            id="currency"
                            name="currency"
                            placeholder="Enter trade currency"
                            autoComplete='off'
                        />
                        {errors.currency && <div className='invalid-message'>{errors.currency}</div>}
                    </div>

                    <div className="form-button-wrapper">
                        <button
                            className="action-button"
                            type="submit"
                            disabled={!!Object.values(errors).length || isLoading}
                        >
                            {isLoading ? 'Loading...' : 'Buy'}
                        </button>
                    </div>
                </Form>
            }
        </Formik>
    )
};

export default TradeModalForm;