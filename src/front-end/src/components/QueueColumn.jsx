import { React, useState, useEffect } from 'react'
import QueueEntry from './QueueEntry'
import plusIconURL from '../assets/Plus.svg' 
import { openModal } from './ModalConfig'
import AddEntry from './AddEntry'
import MoveEntry from './MoveEntry'


const QueueColumn = ({ columnName, state=[], patients=[], practitioners=[], queueState, setQueueEntries }) => {
    return (
        <div className="box is-overflow is-third-width is-fullheight has-background-light large-rounded-box is-flex is-flex-direction-column mr-3 mb-0">
            <div className="bottom-border is-flex is-flex-direction-row">
                <h2 className="is-size-5 has-text-weight-semibold">{columnName}</h2>
                <img src={plusIconURL} className="image is-16x16 is-align-end is-clickable" onClick={() => openModal(`add-entry-${queueState.replace(/\s/g, '-')}`)} />
            </div>
            <ul className="is-overflow is-fullheight">
                {state.length > 0 && state.map((entry, index) => (
                    <li key={index}>
                        <QueueEntry entry={entry} setQueueEntries={setQueueEntries}/>
                        <AddEntry patients={patients} practitioners={practitioners} queueState={queueState} columnName={columnName} setQueueEntries={setQueueEntries}/>
                    </li>          
                ))}
            </ul>
        </div>
    )
}

export default QueueColumn
