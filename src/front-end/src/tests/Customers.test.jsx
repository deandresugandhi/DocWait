import { describe, expect, it } from "vitest"
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { mockPatients, mockPractitioners, mockEntries } from './MockData'
import Customers from "../components/Customers"



describe('Customers Component', () => {
    let container
    const mockSetPatients = vi.fn();

    beforeEach(() => {

        container = render(
            <Customers  
                patients={mockPatients} 
                setQueueEntries={mockSetPatients}
            />
        ).container
    })

    it('renders Customers page headers', () => {
        expect(container.querySelector('h2')).toHaveTextContent("Clinic Name's")
        expect(container.querySelector('h1')).toHaveTextContent("Customers")
    })

    it('displays the right amount of Patients (with Add More field)', () => {
        const testAmount = (container, length) => {
            const listItems = container.querySelectorAll('li')
            expect(listItems).toHaveLength(length)
        }
        testAmount(container, 6)
    })

    it('Ensure Add More field work as expected', async () => {
        global.fetch = vi.fn((url, options) => {
            if (options.method === 'POST') {
                return Promise.resolve({
                json: () => Promise.resolve(options.body),
              });
            } else {
              throw new Error('Only POST requests are mocked');
            }
        });
        const addMore = screen.getByTestId('add-more')
        expect(addMore).toBeInTheDocument()
        userEvent.click(addMore)
        const addPatient = container.querySelector('#add-patient')
        expect(addPatient).toBeInTheDocument()
        const textAreas = addPatient.querySelectorAll('textarea')
        for (let textArea of textAreas) {
            await userEvent.type(textArea, "test")
            console.log(textArea.value)
        }
        await new Promise((resolve) => setTimeout(resolve, 10));
        const saveChangesButton = addPatient.querySelector('button')
        // await new Promise((resolve) => setTimeout(resolve, 10))
        userEvent.click(saveChangesButton)
        await new Promise((resolve) => setTimeout(resolve, 10))
        expect(fetch).toHaveBeenCalledTimes(2)
    })
})