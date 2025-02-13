import { render, screen, act } from '@testing-library/react'
import { AnimationProvider, useAnimation } from '../components/providers/animation-provider'

function TestComponent() {
  const { reduceMotion, duration, setReduceMotion, setDuration } = useAnimation()
  return (
    <div>
      <div data-testid="reduce-motion">{reduceMotion.toString()}</div>
      <div data-testid="duration">{duration}</div>
      <button onClick={() => setReduceMotion(!reduceMotion)}>Toggle Motion</button>
      <button onClick={() => setDuration(0.5)}>Change Duration</button>
    </div>
  )
}

describe('Animation System', () => {
  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }))
  })

  it('provides animation preferences through context', () => {
    render(
      <AnimationProvider>
        <TestComponent />
      </AnimationProvider>
    )
    
    expect(screen.getByTestId('reduce-motion')).toHaveTextContent('false')
    expect(screen.getByTestId('duration')).toHaveTextContent('0.2')
  })

  it('updates animation preferences', async () => {
    render(
      <AnimationProvider>
        <TestComponent />
      </AnimationProvider>
    )
    
    await act(async () => {
      screen.getByText('Toggle Motion').click()
    })
    
    expect(screen.getByTestId('reduce-motion')).toHaveTextContent('true')
    
    await act(async () => {
      screen.getByText('Change Duration').click()
    })
    
    expect(screen.getByTestId('duration')).toHaveTextContent('0.5')
  })

  it('respects system preferences for reduced motion', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }))

    render(
      <AnimationProvider>
        <TestComponent />
      </AnimationProvider>
    )
    
    expect(screen.getByTestId('reduce-motion')).toHaveTextContent('true')
  })
})