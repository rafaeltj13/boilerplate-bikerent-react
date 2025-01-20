import { act, render, screen } from '@testing-library/react'
import BikeRentCalendar from '.'
import userEvent from '@testing-library/user-event'

jest.useFakeTimers()

jest.mock(
  'react-day-picker/style.css',
  () => {
    return {
      __esModule: true,
      default: {},
    }
  },
  { virtual: true },
)

describe('BikeRentCalendar', () => {
  const mockOnSelectRange = jest.fn()

  beforeEach(() => {
    mockOnSelectRange.mockClear()

    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-01-20'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders with correct initial state', () => {
    render(<BikeRentCalendar onSelectRange={mockOnSelectRange} />)

    // Check if title is rendered
    expect(screen.getByText('Select date and time')).toBeInTheDocument()

    // Check if calendar is rendered with current month
    expect(screen.getByText('January')).toBeInTheDocument()

    // Verify that no date is initially selected
    expect(mockOnSelectRange).toHaveBeenCalledWith(undefined)
  })

  it('disables dates before current date', () => {
    render(<BikeRentCalendar onSelectRange={mockOnSelectRange} />)

    // Find a past date by its full aria-label
    const pastDate = screen.getByRole('button', {
      name: 'Friday, January 10th, 2025',
    })
    expect(pastDate).toBeDisabled()
  })

  it('allows selecting a date range', async () => {
    render(<BikeRentCalendar onSelectRange={mockOnSelectRange} />)

    // Select start date using full aria-label
    const startDate = screen.getByRole('button', {
      name: 'Tuesday, January 21st, 2025',
    })
    await act(async () => {
      userEvent.click(startDate)
    })

    // Select end date using full aria-label
    const endDate = screen.getByRole('button', {
      name: 'Thursday, January 23rd, 2025',
    })
    await act(async () => {
      userEvent.click(endDate)
    })

    // Get the last call arguments and create dates with local timezone
    const lastCallArg = mockOnSelectRange.mock.calls[mockOnSelectRange.mock.calls.length - 1][0]
    expect(lastCallArg.from?.getDate()).toBe(21)
    expect(lastCallArg.from?.getMonth()).toBe(0) // January
    expect(lastCallArg.to?.getDate()).toBe(23)
    expect(lastCallArg.to?.getMonth()).toBe(0) // January
  })

  it('handles month navigation correctly', async () => {
    render(<BikeRentCalendar onSelectRange={mockOnSelectRange} />)

    // Verify current month
    expect(screen.getByText('January')).toBeInTheDocument()

    // Click next month button
    const nextMonthButton = screen.getByRole('button', {
      name: /go to the next month/i,
    })
    await act(async () => {
      userEvent.click(nextMonthButton)
    })

    // Verify February is displayed
    expect(screen.getByText('February')).toBeInTheDocument()
  })

  it('applies correct styling to the calendar', () => {
    render(<BikeRentCalendar onSelectRange={mockOnSelectRange} />)

    // Check if root element has correct classes
    const root = screen.getByRole('grid').parentElement
    expect(root?.className).toContain('rdp-month text-white')
  })

  it('highlights today`s date correctly', () => {
    render(<BikeRentCalendar onSelectRange={mockOnSelectRange} />)

    expect(document.querySelector('.rdp-day[data-today]')).toBeInTheDocument()
    expect(document.querySelector('.rdp-day_button')).toBeInTheDocument()
  })
})
