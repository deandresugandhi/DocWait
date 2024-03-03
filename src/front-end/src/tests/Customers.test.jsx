import { describe, expect, it, vi } from "vitest"
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { mockPatients } from './MockData'
import Customers from "../components/Customers"
import '../msw/setup';


describe('Customers Component', () => {
    let container
    const mockSetPatients = vi.fn();

    beforeEach(() => {
        container = render(
            <Customers  
                patients={mockPatients} 
                setPatients={mockSetPatients}
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

    it('Ensure Add More field work as expected, adding patient records', async () => {
        const consoleMock = vi.spyOn(console, 'log').mockImplementation(() => undefined)
        const addMore = screen.getByTestId('add-more')
        expect(addMore).toBeInTheDocument()
        userEvent.click(addMore)
        const addPatient = container.querySelector('#add-patient')
        expect(addPatient).toBeInTheDocument()
        const textAreas = addPatient.querySelectorAll('textarea')
        for (let textArea of textAreas) {
            await userEvent.type(textArea, "test");
        }
        await new Promise((resolve) => setTimeout(resolve, 0))
        const saveChangesButton = addPatient.querySelector('.is-success')
        await userEvent.click(saveChangesButton)
        await new Promise((resolve) => setTimeout(resolve, 0))
        expect(consoleMock).toHaveBeenCalledWith({
            firstName: 'test',
            lastName: 'test',
            address: '1',
            phoneNumber: 'test'
        })
        consoleMock.mockReset()
    })
})