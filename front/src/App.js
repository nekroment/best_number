import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Diagram from './components/Diagram';
import Logs from './components/Logs';
import Vote from './components/Vote';
import { getLogsThunkCreator, getVotesThunkCreator, newVoteThunkCreator } from './redux/reducer/numberReducer';

function App(props) {

  async function getVotes(date) {
    await props.getVotes(date);
  }

  useEffect(() => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const date = day + '-' + month + '-' + year;
    getVotes(date)}, []);

  return (
    <div className="App">
      <Switch>
        <Route path='/vote' component={() => <Vote newVote={props.newVote}/>} />
        <Route path='/logs' component={() => <Logs logs={props.logs}/>} />
        <Route path='/' component={() => <Diagram votes={props.votes} getVotes={props.getVotes}/>} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  votes: state.vote.votes,
  logs: state.vote.logs
});

export default connect(mapStateToProps, {
  getVotes: getVotesThunkCreator,
  getLogs: getLogsThunkCreator,
  newVote: newVoteThunkCreator
})(App);
