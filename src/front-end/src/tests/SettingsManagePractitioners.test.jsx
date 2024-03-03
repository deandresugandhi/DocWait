import { describe, expect, it } from "vitest"
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { mockPractitioners } from './MockData'
import SettingsManagePractitioner from "../components/SettingsManagePractitioner"
import { BrowserRouter } from 'react-router-dom'
import '../msw/setup';


describe('SettingsManagePractitioner Component', () => {
    let container
    const mockSetPractitioners = vi.fn();

    beforeEach(() => {
        container = render(
            <BrowserRouter>
                <SettingsManagePractitioner
                    practitioners={mockPractitioners}
                    setPractitioners={mockSetPractitioners}
                />
            </BrowserRouter>
            ).container 
    })

    it('renders SettingsManagePractitioners page headers', () => {
       const headers = container.querySelectorAll('h1')
       const subHeaders = container.querySelectorAll('h2')
       expect(headers[0]).toHaveTextContent("Clinic Name's")
       expect(headers[1]).toHaveTextContent('Settings')
       expect(subHeaders[0]).toHaveTextContent('NAME')
       expect(subHeaders[1]).toHaveTextContent('AVAILABILITY')
    })

    it('renders the right amount of Practitioners page headers (including Setting list (2 li items) and Add More button (1 li item)', () => {
        const practitionerEntries = container.querySelectorAll('li')
        expect(practitionerEntries).toHaveLength(5)
     })

     it('renders the right practitioner names', () => {
        const practitionerEntries = container.querySelectorAll('li h2')
        expect(practitionerEntries[0]).toHaveTextContent('Rajesh Patel')
        expect(practitionerEntries[1]).toHaveTextContent('Priya Kumar')
     })

     it('Ensure Add More field work as expected, adding patient records', async () => {
        const consoleMock = vi.spyOn(console, 'log').mockImplementation(() => undefined)
        const addMore = screen.getByTestId('add-more-practitioner')
        expect(addMore).toBeInTheDocument()
        userEvent.click(addMore)
        const addPractitioner = container.querySelector('#add-practitioner')
        expect(addPractitioner).toBeInTheDocument()
        const textAreas = addPractitioner.querySelectorAll('textarea')
        for (let textArea of textAreas) {
            await userEvent.type(textArea, "test");
        }
        await new Promise((resolve) => setTimeout(resolve, 0))
        const saveChangesButton = addPractitioner.querySelector('.is-success')
        await userEvent.click(saveChangesButton)
        await new Promise((resolve) => setTimeout(resolve, 0))
        expect(consoleMock).toHaveBeenCalledWith({
            firstName: 'test',
            lastName: 'test',
            phoneNumber: 'test',
            availability: "On duty"
        })
        consoleMock.mockReset()
    })
})
