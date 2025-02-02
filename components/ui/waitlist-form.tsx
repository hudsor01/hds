// components/ui/waitlist-form.tsx
import LoadingButton from '@mui/lab/LoadingButton'
import
  {
    Alert,
    Box,
    Snackbar,
    TextField
  } from '@mui/material'
import { useState } from 'react'

export function WaitlistForm() {
 const [email, setEmail] = useState('')
 const [loading, setLoading] = useState(false)
 const [showSuccess, setShowSuccess] = useState(false)
 const [error, setError] = useState('')

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault()
   setLoading(true)
   setError('')

   try {
     const res = await fetch('/api/mail', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email })
     })

     if (!res.ok) throw new Error('Submission failed')

     setShowSuccess(true)
     setEmail('')
   } catch (err) {
     setError('Failed to join waitlist. Please try again.')
   } finally {
     setLoading(false)
   }
 }

 return (
   <Box
     component="form"
     onSubmit={handleSubmit}
     sx={{ maxWidth: 400, mx: 'auto' }}
   >
     <TextField
       fullWidth
       label="Email Address"
       type="email"
       variant="outlined"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       required
       sx={{ mb: 2 }}
     />

     <LoadingButton
       fullWidth
       loading={loading}
       variant="contained"
       type="submit"
       sx={{ py: 1.5 }}
     >
       Join Waitlist
     </LoadingButton>

     <Snackbar
       open={showSuccess}
       autoHideDuration={6000}
       onClose={() => setShowSuccess(false)}
     >
       <Alert severity="success">
         Thanks for joining the waitlist!
       </Alert>
     </Snackbar>

     {error && (
       <Alert severity="error" sx={{ mt: 2 }}>
         {error}
       </Alert>
     )}
   </Box>
 )
}
