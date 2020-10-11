import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Vote.css';

const Vote = (props) => {

    const [vote, setVote] = useState(false);


    async function newVote(event) {
        const number = event.currentTarget.value;
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth();
        const year = now.getFullYear();
        const date = day + '-' + month + '-' + year;
        await props.newVote(number, date);
        setVote(true);
    }

    function createButton(number) {
        return <div key={number}>
            <button onClick={(event) => newVote(event)} type="button" value={`${number}`} className="btn btn-primary vote">{number}</button>
        </div>
    }

    const button = [];
    for (let i = 1; i <= 9; i++) {
        button.push(createButton(i));
    }

    if (vote) {
        return <Redirect to="/" />
    }

    return (
        <div className="container">
            <div className="row justify-content-md-center justify-content-lg-center justify-content-sm-center justify-content-xs-center vote">
                <div className="border border-primary rounded">
                    <div className="text-center font-weight-bold">
                        Выбери любимое число
                    </div>
                    <form>
                        {button}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Vote;