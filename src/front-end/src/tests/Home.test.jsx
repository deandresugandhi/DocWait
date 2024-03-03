import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Home from "../components/Home"
import userEvent from '@testing-library/user-event'
import { mockPatients, mockPractitioners, mockEntries } from './MockData'

describe('Home Component', () => {
    let container
    const mockSetQueueEntries = vi.fn();

    beforeEach(() => {
        container = render(
            <Home 
                queueEntries={mockEntries} 
                patients={mockPatients} 
                practitioners={mockPractitioners} 
                setQueueEntries={mockSetQueueEntries}
            />
        ).container
    })

    it('renders Home page headers', () => {
        expect(container.querySelector('h2')).toHaveTextContent('Welcome Back,')
        expect(container.querySelector('h1')).toHaveTextContent('Clinic Name')
    })

    it('renders QueueColumn components in Home', () => {
        const queueColumns = screen.getAllByTestId('queue-column');
        expect(queueColumns).toHaveLength(3);
    
        queueColumns.forEach((column, index) => {
        const columnName = ['In Queue', 'Serving', 'Completed'][index]
        const state = ['Pending', 'In progress', 'Completed'][index]
        expect(column).toHaveAttribute('data-testid', 'queue-column')
        expect(column.querySelector('h2')).toHaveTextContent(columnName)
        })
    })
})