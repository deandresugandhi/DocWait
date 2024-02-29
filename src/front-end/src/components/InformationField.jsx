import { React, useState, useEffect } from 'react'


const InformationField = ({ label, state, setState, clinic=[], fieldName }) => {
    const [placeholderValue, setPlaceholderValue] = useState('');

    useEffect(() => {
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

const OpeningHoursField =  ({ label, state, setState, openingHours=[] }) => {
    const DropDown = ({ day, index }) => {
        const [isOpenPlaceholderValue, setIsOpenPlaceholderValue] = useState('');
        const [openingTimePlaceholderValue, setOpeningTimePlaceholderValue] = useState('');
        const [closingTimePlaceholderValue, setClosingTimePlaceholderValue] = useState('');

        useEffect(() => {
            if (openingHours.length > 0) {
                setIsOpenPlaceholderValue(openingHours[index]["isOpen"]);
                setOpeningTimePlaceholderValue(openingHours[index]["openingTime"])
                setClosingTimePlaceholderValue(openingHours[index]["closingTime"])
            } else {
                setIsOpenPlaceholderValue(false);
                setOpeningTimePlaceholderValue("Loading...")
                setClosingTimePlaceholderValue("Loading...")
            }
        }, [openingHours]);

        return (
            <>
                <div className="field is-grouped is-align-items-center">
                    <div className="control is-tenth-width mr-6">
                        <label className="label">{day}</label>
                    </div>
                    <div className="control">
                        <div className="select is-rounded is-normal">
                            <select defaultValue={isOpenPlaceholderValue} onChange={e => setState(e.target.value)}>
                                <option value="true">Open</option>
                                <option value="false">Closed</option>
                            </select>
                        </div>
                    </div>
                    <div className="control is-tenth-width" />
                    <div className="control is-tenth-width">
                        <textarea className="input" defaultValue={openingTimePlaceholderValue} onChange={e => setState(e.target.value)}></textarea>
                    </div>
                    <div className="control">
                        <p> - </p>
                    </div>
                    <div className="control is-tenth-width">
                        <textarea className="input" defaultValue={closingTimePlaceholderValue} onChange={e => setState(e.target.value)}></textarea>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="large-rounded-box has-background-info p-4 is-three-fourth-width">
                <DropDown day="Monday" index={0}/>
                <DropDown day="Tuesday" index={1}/>
                <DropDown day="Wednesday" index={2}/>
                <DropDown day="Thursday" index={3}/>
                <DropDown day="Friday" index={4}/>
                <DropDown day="Saturday" index={5}/>
                <DropDown day="Sunday" index={6}/>
            </div>
        </div>
    )
}


export { InformationField, OpeningHoursField }
