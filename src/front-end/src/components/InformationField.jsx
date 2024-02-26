import  React from 'react'


const InformationField = ({ fieldName, state, setState, clinic={} }) => {
    return (
        <div className="field">
            <label className="label">{fieldName}</label>
            <div className="control">
                <textarea className="input" value={state} onChange={e => setState(e.target.value)} placeholder={clinic.fieldName}></textarea>
            </div>
        </div>
    )
}

export default InformationField
