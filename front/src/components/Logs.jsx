import React from 'react';

const Logs = (props) => {

    let logs = [];
    if (props.logs.length > 0) {
        logs = props.logs.map((log) => <div key={log._id} className="border border-primary rounded">
            {log.date} {log.url} query: {JSON.stringify(log.json.query)} body: {JSON.stringify(log.json.body)}
        </div>)
    }
    return (
        <div>
          {logs}
        </div>
    )
}

export default Logs;