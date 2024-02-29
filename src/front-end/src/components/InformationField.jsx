import { React, useState, useEffect } from 'react'


const InformationField = ({ label, state, setState, clinic=[], fieldName }) => {
    const [placeholderValue, setPlaceholderValue] = useState('');

    useEffect(() => {
        console.log(clinic)
        if (clinic.length > 0) {
          setPlaceholderValue(clinic[0][fieldName]);
        } else {
          setPlaceholderValue("Loading...");
        }
      }, [clinic]);



    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control">
                <textarea
                className="input"
                value={state}
                onChange={e => setState(e.target.value)}
                placeholder={placeholderValue}
                />
            </div>
        </div>
    );
}

const OpeningHoursField =  ({ label, state, setState, clinic=[] }) => {
    const [isActive, setIsActive] = useState(true)
    const toggleDropdown = () => {
        setIsActive(!isActive)
    }

    const DropDown = ({ day, index }) => {
        return (
            <>
                <div className="field is-grouped is-align-items-center">
                    <div className="control is-tenth-width mr-6">
                        <label className="label">{day}</label>
                    </div>
                    <div className="control">
                        <div className="select is-rounded is-normal">
                            <select value={clinic.length > 0 ? clinic[0].openingHours[index].isOpen : "false"} onChange={e => setState(e.target.value)}>
                                <option value="true">Open</option>
                                <option value="false">Closed</option>
                            </select>
                        </div>
                    </div>
                    <div className="control is-tenth-width" />
                    <div className="control is-tenth-width">
                        <textarea className="input" value={clinic.length > 0 ? clinic[0].openingHours[index].openingTime : "Loading"} onChange={e => setState(e.target.value)}></textarea>
                    </div>
                    <div className="control">
                        <p> - </p>
                    </div>
                    <div className="control is-tenth-width">
                        <textarea className="input" value={clinic.length > 0 ? clinic[0].openingHours[index].closingTime : "Loading"} onChange={e => setState(e.target.value)}></textarea>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="large-rounded-box has-background-info p-4 is-three-fourth-width">
                <DropDown day="Monday" index="0"/>
                <DropDown day="Tuesday" index="1"/>
                <DropDown day="Wednesday" index="2"/>
                <DropDown day="Thursday" index="3"/>
                <DropDown day="Friday" index="4"/>
                <DropDown day="Saturday" index="5"/>
                <DropDown day="Sunday" index="6"/>
            </div>
        </div>
    )
}


export { InformationField, OpeningHoursField }
