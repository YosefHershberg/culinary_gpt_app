import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import WelcomePage from '../WelcomePage'

// Mock useNavigate hook from react-router-dom
const mockNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate
}))

describe('WelcomePage', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        vi.resetAllMocks()
    })

    it('renders the welcome page correctly', () => {
        render(
            <WelcomePage />
        )

        expect(screen.getByText(/Welcome to CulinaryGPT/i)).toBeInTheDocument()
        expect(screen.getByText(/We'll find you perfect dish to prepare!/i)).toBeInTheDocument()
        expect(screen.getByText(/Say goodbye to boring meals/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument()
    })

    it('navigates to create-new-recipe if not signed in', () => {
        vi.mock('@clerk/clerk-react', () => ({
            useUser: () => ({ isSignedIn: true })
        }))

        render(
            <WelcomePage />
        )

        fireEvent.click(screen.getByRole('button', { name: /Get Started/i }))
        expect(mockNavigate).toHaveBeenCalledWith('/create-new-recipe')
    })
})
