import { describe, expect, it } from "vitest"
import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import AboutUs from "../components/AboutUs"



describe('AboutUs Component', () => {
    let container
    const mockSetPatients = vi.fn();

    beforeEach(() => {
        container = render(
            <AboutUs/>
            ).container
    })

    it('renders AboutUs page headers', () => {
       const headers = container.querySelectorAll('h1')
       expect(headers[0]).toHaveTextContent('DOC WAIT')
       expect(headers[1]).toHaveTextContent('About Us')
       expect(headers[2]).toHaveTextContent('Our Mission')
       expect(headers[3]).toHaveTextContent('Our Team')
    })
})