import { React, useState, useEffect } from 'react'


const InformationField = ({ label, setState, clinic=[], nested=false, fieldName }) => {
    const [placeholderValue, setPlaceholderValue] = useState('');

    useEffect(() => {
        if (clinic.length > 0) {
            if (nested === false) {
                setPlaceholderValue(clinic[0][fieldName]);
            } else if (nested === true) {
                setPlaceholderValue(clinic[0].address[fieldName])
            }
        } else {
          setPlaceholderValue("Loading...");
        }
      }, [clinic]);

    return (
        <div className="field">
            <label className={`label ${nested === true ? "is-size-7" : '' }`}>{label}</label>
            <div className="control">
                <textarea
                className="input"
                value={placeholderValue}
                onChange={e => {
                    setState(e.target.value)
                    setPlaceholderValue(e.target.value)
                }}
                placeholder={placeholderValue}
                />
            </div>
        </div>
    );
}

const DropDown = ({ day, index, setStates, openingHours=[] }) => {
    const [isOpenPlaceholderValue, setIsOpenPlaceholderValue] = useState('');
    const [openingTimePlaceholderValue, setOpeningTimePlaceholderValue] = useState('');
    const [closingTimePlaceholderValue, setClosingTimePlaceholderValue] = useState('');

    useEffect(() => {
        if (openingHours.length > 0) {
            let filteredData = openingHours.filter(item => item.day === day)
            setIsOpenPlaceholderValue((filteredData[0]["isOpen"] === false ? "false" : "true"));
            setOpeningTimePlaceholderValue(filteredData[0]["openingTime"])
            setClosingTimePlaceholderValue(filteredData[0]["closingTime"])
        } else {
            setIsOpenPlaceholderValue("test");
            setOpeningTimePlaceholderValue("Loading...")
            setClosingTimePlaceholderValue("Loading...")
        }
        
    }, [openingHours]);

    useEffect(() => {
        console.log(isOpenPlaceholderValue);
      }, [isOpenPlaceholderValue]);

    return (
        <>
            <div className="field is-grouped is-grouped-multiline is-align-items-center my-3">
                <div className="control is-custom-width-2">
                    <label className="label is-flex is-justify-content-center">{day}</label>
                </div>
                <div className="control">
                    <div className="select is-rounded is-normal mr-2">
                        <select 
                            value={isOpenPlaceholderValue} 
                            onChange={(e) => {
                                setIsOpenPlaceholderValue(e.target.value);
                                setStates[index][0](e.target.value);
                            }}
                        >
                            <option value="true">Open</option>
                            <option value="false">Closed</option>
                        </select>
                    </div>
                </div>
                <div className="control is-flex is-flex-direction-row is-custom-width">
                    <textarea className="input" 
                        value={openingTimePlaceholderValue} 
                        onChange={(e) => {
                            setOpeningTimePlaceholderValue(e.target.value);
                            setStates[index][1](e.target.value);
                        }}
                    >
                    </textarea>
                    <p className="p-2">-</p>
                    <textarea className="input" 
                        value={closingTimePlaceholderValue} 
                        onChange={e => {
                            setClosingTimePlaceholderValue(e.target.value);
                            setStates[index][2](e.target.value);
                        }}
                    >
                    </textarea>
                </div>
            </div>
        </>
    )
}

const OpeningHoursField =  ({ label, setStates, openingHours=[] }) => {
    
    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="large-rounded-box has-background-info p-4 is-fullwidth
            ">
                {DropDown({day:"Monday", index:0, setStates:setStates, openingHours:openingHours})}
                {DropDown({day:"Tuesday", index:1, setStates:setStates, openingHours:openingHours})}
                {DropDown({day:"Wednesday", index:2, setStates:setStates, openingHours:openingHours})}
                {DropDown({day:"Thursday", index:3, setStates:setStates, openingHours:openingHours})}
                {DropDown({day:"Friday", index:4, setStates:setStates, openingHours:openingHours})}
                {DropDown({day:"Saturday", index:5, setStates:setStates, openingHours:openingHours})}
                {DropDown({day:"Sunday", index:6, setStates:setStates, openingHours:openingHours})}
            </div>
        </div>
    )
}


export { InformationField, OpeningHoursField }
