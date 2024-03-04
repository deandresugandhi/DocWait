import { React, useState, useEffect } from 'react'
import QueueEntry from './QueueEntry'
import plusIconURL from '../assets/Plus.svg' 
import { openModal } from './ModalConfig'
import AddEntry from './AddEntry'
import loadingIcon from '../assets/LoadingIcon.gif'


const QueueColumn = ({ columnName, state=[], patients=[], practitioners=[], queueState, setQueueEntries, loadingQueues }) => {
    return (
        <div className="column is-full is-one-third-widescreen is-fullheight" data-testid="queue-column">
            <div className="p-5 has-background-light is-fullheight large-rounded-box">
                <div className="bottom-border is-flex is-flex-direction-row">
                    <h2 className="is-size-5 has-text-weight-semibold">{columnName}</h2>
                    <img src={plusIconURL} className="image is-16x16 is-align-end is-clickable" onClick={() => openModal(`add-entry-${queueState.replace(/\s/g, '-')}`)} />
                </div>
                {loadingQueues ? (
                    <div className="is-fullwidth is-flex is-justify-content-center is-align-items-center"> 
                        <img src={loadingIcon} alt="Loading..." className="loading-icon"/>
                    </div>
                    ) : (
                        <ul className="is-overflow is-fullheight">
                            {state.length > 0 && state.map((entry, index) => (
                                <li key={index}>
                                    <QueueEntry entry={entry} setQueueEntries={setQueueEntries} columnName={columnName}/>
                                </li>          
                            ))}
                        </ul>
                    )
                }
                <AddEntry patients={patients} practitioners={practitioners} queueState={queueState} columnName={columnName} setQueueEntries={setQueueEntries}/>
            </div>
        </div>
    )
}

export default QueueColumn
