import { describe, expect, it } from "vitest"
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { mockPatients, mockPractitioners, mockEntries } from './MockData'
import QueueColumn from "../components/QueueColumn"

describe('QueueColumn Component', () => {
    let containerPending
    let containerInProgress
    let containerCompleted
    const mockSetQueueEntries = vi.fn()
    const statePending = mockEntries.filter(entry => entry["queueState"] === "Pending")
    const stateInProgress = mockEntries.filter(entry => entry["queueState"] === "In progress")
    const stateCompleted = mockEntries.filter(entry => entry["queueState"] === "Completed")

    beforeEach(() => {
        containerPending = render(
          <QueueColumn
            columnName="In Queue"
            state={statePending}
            patients={mockPatients}
            practitioners={mockPractitioners}
            queueState="Pending"
            setQueueEntries={mockSetQueueEntries}
          />
        ).container
        containerInProgress = render(
            <QueueColumn
              columnName="Serving"
              state={stateInProgress}
              patients={mockPatients}
              practitioners={mockPractitioners}
              queueState="In progress"
              setQueueEntries={mockSetQueueEntries}
            />
        ).container
        containerCompleted = render(
        <QueueColumn
            columnName="Completed"
            state={stateCompleted}
            patients={mockPatients}
            practitioners={mockPractitioners}
            queueState="Completed"
            setQueueEntries={mockSetQueueEntries}
        />
        ).container
    })

    it('calls openModal on image click and modal exists', () => {
        const image = containerPending.querySelector('img')
        expect(image).toBeInTheDocument()
        userEvent.click(image)
        const modal = containerPending.querySelector(`#add-entry-Pending`)
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

    it('Ensure adding entry work as expected to add new queue entries', async () => {
        const consoleMock = vi.spyOn(console, 'log').mockImplementation(() => undefined)
        const addEntryButton = containerPending.querySelector('.image')
        expect(addEntryButton).toBeInTheDocument()
        userEvent.click(addEntryButton)
        const addEntry = containerPending.querySelector('.modal')
        expect(addEntry).toBeInTheDocument()
        const textAreas = containerPending.querySelectorAll('.input-date-time')
        await userEvent.type(textAreas[0], "11/11/2001")
        await userEvent.type(textAreas[1], "11:11")
        await new Promise((resolve) => setTimeout(resolve, 0))
        const dropdowns = containerPending.querySelectorAll('.select-add-entry')
        await userEvent.selectOptions(dropdowns[0], "Michael Jordan")
        await userEvent.selectOptions(dropdowns[1], "Priya Kumar")
        const saveChangesButton = addEntry.querySelector('.is-success')
        await userEvent.click(saveChangesButton)
        await new Promise((resolve) => setTimeout(resolve, 0))
        expect(mockSetQueueEntries).toHaveBeenCalledOnce
    })
})