import { describe, expect, it } from "vitest"
import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { mockPatients, mockPractitioners, mockEntries } from './MockData'
import QueueColumn from "../components/QueueColumn"

describe('QueueColumn Component', () => {
    let containerPending
    let containerInProgress
    let containerCompleted
    const mockSetQueueEntries = vi.fn()
    const queueState = "Pending"
    const statePending = mockEntries.filter(entry => entry["queueState"] === "Pending")
    const stateInProgress = mockEntries.filter(entry => entry["queueState"] === "In progress")
    const stateCompleted = mockEntries.filter(entry => entry["queueState"] === "Completed")

    beforeEach(() => {
        containerPending = render(
          <QueueColumn
            columnName="Pending"
            state={statePending}
            patients={mockPatients}
            practitioners={mockPractitioners}
            queueState={queueState}
            setQueueEntries={mockSetQueueEntries}
          />
        ).container
        containerInProgress = render(
            <QueueColumn
              columnName="In progress"
              state={stateInProgress}
              patients={mockPatients}
              practitioners={mockPractitioners}
              queueState={queueState}
              setQueueEntries={mockSetQueueEntries}
            />
        ).container
        containerCompleted = render(
        <QueueColumn
            columnName="Completed"
            state={stateCompleted}
            patients={mockPatients}
            practitioners={mockPractitioners}
            queueState={queueState}
            setQueueEntries={mockSetQueueEntries}
        />
        ).container
    })

    it('calls openModal on image click and modal exists', () => {
        const image = containerPending.querySelector('img')
        expect(image).toBeInTheDocument()
        userEvent.click(image)
        const modal = containerPending.querySelector(`#add-entry-${queueState}`)
        expect(modal).toBeInTheDocument()
    });

    it('displays the right amount of Queue Entries', () => {
        const testAmount = (container, length) => {
            const listItems = container.querySelectorAll('li')
            expect(listItems).toHaveLength(length)
        }

        testAmount(containerPending, 2)
        testAmount(containerInProgress, 1)
        testAmount(containerCompleted, 1)
    });

    
})