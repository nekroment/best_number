import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Select } from '../utils/FormControl';
import './Diagram.css';
var validateDate = require("validate-date");

const DateForm = (props) => {
    const day = [<option key={0} value={''}>Day</option>];
    const month = [<option key={0} value={''}>Month</option>];
    const year = [<option key={0} value={''}>Year</option>];

    function dayMonth(number) {
        return <option key={number} value={number}>{number}</option>
    }

    for (let i = 1; i <= 31; i++) {
        day.push(dayMonth(i));
    }
    for (let i = 1; i <= 12; i++) {
        month.push(dayMonth(i));
    }
    for (let i = 2020; i <= 2030; i++) {
        year.push(dayMonth(i));
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <Field name={'day'} component={Select}>
                {day}
            </Field>
            <Field name={'month'} component={Select}>
                {month}
            </Field>
            <Field name={'year'} component={Select}>
                {year}
            </Field>
            <button className="btn btn-primary btn-sm">Запрос</button>
        </form>
    )
}

const DateReduxForm = reduxForm({
    form: 'date'
})(DateForm);

const Diagram = (props) => {

    const [labels, setLabels] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [color, setColor] = useState(['red', 'blue', 'green', 'yellow', 'gray', 'pink', 'black', 'brown', 'purple']);

    useEffect(() => {
        if (props.votes.length > 0) {

            const newLabels = [];
            const newData = [];

            for (let i = 0; i < props.votes.length; i++) {
                newLabels.push(props.votes[i].number);
                newData.push(props.votes[i].count);
            }

            setLabels(newLabels);
            setData(newData);
        }
    }, [props.votes])
    const onSubmit = (formData) => {
        const date = formData.year + '-' + (formData.month < 10 ? '0' + formData.month : formData.month) + '-' + (formData.day < 10 ? '0' + formData.day : formData.day);
        if (validateDate(date) === 'Valid Date') {
            const reqDate = formData.day + '-' + formData.month + '-' + formData.year;
            props.getVotes(reqDate);
        } else {
            alert('Invalid date');
        }
    }

    return (
        <div>
            <Pie
                data={{
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: color
                    }]
                }}
                height={100}
            />
            <div className='container'>
                <div className='row justify-content-md-center justify-content-lg-center justify-content-sm-center justify-content-xs-center diagram'>
                    <DateReduxForm onSubmit={onSubmit} />
                    <NavLink to='/vote'><button className="btn btn-primary btn-sm">Проголосовать</button></NavLink>
                </div>
            </div>
        </div>
    )
}

export default Diagram;