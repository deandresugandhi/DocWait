import { describe, expect, it } from "vitest"
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { mockOpeningHours, mockClinic } from './MockData'
import AboutUs from "../components/AboutUs"
import SettingsUpdateInformation from "../components/SettingsUpdateInformation"
import { BrowserRouter, Routes, Route } from 'react-router-dom'


describe('SettingsManagePractitioner Component', () => {
    let container
    const mockSetPractitioners = vi.fn();

    beforeEach(() => {
        container = render(
            <BrowserRouter>
                <SettingsUpdateInformation
                    clinic={mockClinic}
                    openingHours={mockOpeningHours}
                />
            </BrowserRouter>
            ).container 
    })

    it('renders SettingsUpdateInformation page headers', () => {
       const headers = container.querySelectorAll('h1')
       expect(headers[0]).toHaveTextContent("Clinic Name's")
       expect(headers[1]).toHaveTextContent('Settings')
       expect(headers[2]).toHaveTextContent("Update Information")
    })

    it('renders the right amount of fields (7 fields for days of the week, 1 field grouping the days, 7 fields in address details, 2 fields for URL and Clinic Name, 1 field for buttons)', () => {
        const practitionerEntries = container.querySelectorAll('.field')
        expect(practitionerEntries).toHaveLength(18)
    })

    it('displays the right placeholder values for the fields)', () => {
        const practitionerEntries = container.querySelectorAll('.field textarea')
        expect(practitionerEntries[0]).toHaveTextContent("Waterloo Medical Centre")
        expect(practitionerEntries[1]).toHaveTextContent("4")
        expect(practitionerEntries[2]).toHaveTextContent("45")
        expect(practitionerEntries[3]).toHaveTextContent("Wyndham st")
        expect(practitionerEntries[4]).toHaveTextContent("Alexandria")
        expect(practitionerEntries[5]).toHaveTextContent("NSW")
        expect(practitionerEntries[6]).toHaveTextContent("2015")
        expect(practitionerEntries[7]).toHaveTextContent("Australia")
        expect(practitionerEntries[8]).toHaveTextContent("http://www.waterloomedicalcentre.com.au/")
    })
})
