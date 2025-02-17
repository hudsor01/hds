'use client'

import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

interface NameFormProps {
  userName: string
  userId: string
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: theme.palette.text.primary,
    cursor: 'default'
  }
}))

export default function NameForm({ userName, userId }: NameFormProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <StyledTextField
        id="name"
        label="Full Name"
        value={userName}
        fullWidth
        disabled
        variant="outlined"
        InputProps={{
          readOnly: true
        }}
        sx={{
          '& .MuiInputLabel-root.Mui-disabled': {
            color: 'text.secondary'
          }
        }}
      />
    </Box>
  )
}
