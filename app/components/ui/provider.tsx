'use client'

import { ChakraProvider, createSystem } from '@chakra-ui/react'
import type { ReactNode } from 'react'

const system = createSystem({
  cssVarsRoot: ':host, :root',
})

interface ProviderProps {
  children: ReactNode
}

export function Provider({ children }: ProviderProps): React.ReactElement {
  return (
    <ChakraProvider value={system}>
      {children}
    </ChakraProvider>
  )
}
