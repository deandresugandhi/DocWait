import { React, useState } from 'react'


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

const OpeningHoursField =  ({ fieldName, state, setState, clinic={} }) => {
    const [isActive, setIsActive] = useState(true)
    const toggleDropdown = () => {
        setIsActive(!isActive)
    }

    const DropDown = ({ day }) => {
        return (
            <>
                <div className="field is-grouped is-align-items-center">
                    <div className="control tenth-width">
                        <label className="label">{day}</label>
                    </div>
                    <div className="control">
                        <div className="select is-rounded is-normal">
                            <select value={state.openingHours.isOpen} onChange={e => setState(e.target.value)}>
                                <option value="true">Open</option>
                                <option value="false">Closed</option>
                            </select>
                        </div>
                    </div>
                    <div className="control tenth-width">
                        <textarea className="input" value={state.openingHours.openingTime} onChange={e => setState(e.target.value)}></textarea>
                    </div>
                    <div className="control">
                        <p> - </p>
                    </div>
                    <div className="control tenth-width">
                        <textarea className="input" value={state.openingHours.closingTime} onChange={e => setState(e.target.value)}></textarea>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="field">
            <label className="label">{fieldName}</label>
            <div className="large-rounded-box custom-color-2 p-4 bordered three-fourth-width">
                <DropDown day="Monday"/>
                <DropDown day="Tuesday"/>
                <DropDown day="Wednesday"/>
                <DropDown day="Thursday"/>
                <DropDown day="Friday"/>
                <DropDown day="Saturday"/>
                <DropDown day="Sunday"/>
            </div>
        </div>
    )
}


export { InformationField, OpeningHoursField }
