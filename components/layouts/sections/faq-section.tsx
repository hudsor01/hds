'use client'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import InfoIcon from '@mui/icons-material/Info'
import LiveHelpIcon from '@mui/icons-material/LiveHelp'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { AnimatePresence, motion } from 'framer-motion'
import NextLink from 'next/link'
import React from 'react'

interface FAQ {
  question: string
  answer: string
  category?: string
}

const faqs: FAQ[] = [
  {
    question: 'Can I change plans later?',
    answer:
      'Yes, you can upgrade or downgrade your plan at any time. Changes to upgraded plans take effect immediately, while downgrades are applied at the start of your next billing cycle. All your data and settings will be preserved when switching plans.',
    category: 'Billing'
  },
  {
    question: 'Is there a free trial available?',
    answer:
      'Yes, we offer a 14-day free trial on all plans with full access to all features. No credit card is required to start your trial. You can upgrade to a paid plan at any time during or after your trial period.',
    category: 'Getting Started'
  }
  // ... rest of the FAQs remain the same
]

const StyledSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(12, 0)
  }
}))

const CategoryHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '& svg': {
    fontSize: '1.5rem'
  }
}))

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
  '&:before': {
    display: 'none'
  },
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  '& .MuiAccordionSummary-content': {
    margin: theme.spacing(1.5, 0)
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: theme.palette.text.secondary,
    transition: theme.transitions.create(['transform', 'color']),
    '&.Mui-expanded': {
      color: theme.palette.primary.main
    }
  }
}))

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0, 2, 2)
}))

const CTACard = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(6),
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create(['box-shadow', 'transform']),
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-4px)'
  }
}))

const CTAButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: 9999,
  textTransform: 'none',
  fontSize: '1.1rem',
  fontWeight: 600
}))

export function FAQSection() {
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  // Group FAQs by category
  const groupedFaqs = React.useMemo(() => {
    return faqs.reduce<Record<string, FAQ[]>>((acc, faq) => {
      const category = faq.category || 'General'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(faq)
      return acc
    }, {})
  }, [])

  return (
    <StyledSection component="section">
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 2
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8 }}>
            Have more questions? We're here to help.
          </Typography>
        </motion.div>

        {Object.entries(groupedFaqs).map(([category, categoryFaqs], categoryIndex) => (
          <Box key={category} sx={{ mb: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <CategoryHeading variant="h5">
                <InfoIcon />
                {category}
              </CategoryHeading>

              <Card
                elevation={0}
                sx={{
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                {categoryFaqs.map((faq, index) => (
                  <StyledAccordion
                    key={index}
                    expanded={expanded === `${category}-${index}`}
                    onChange={handleChange(`${category}-${index}`)}
                  >
                    <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {faq.question}
                      </Typography>
                    </StyledAccordionSummary>
                    <StyledAccordionDetails>
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                              maxWidth: '90%',
                              lineHeight: 1.7
                            }}
                          >
                            {faq.answer}
                          </Typography>
                        </motion.div>
                      </AnimatePresence>
                    </StyledAccordionDetails>
                  </StyledAccordion>
                ))}
              </Card>
            </motion.div>
          </Box>
        ))}

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <CTACard>
            <LiveHelpIcon
              color="primary"
              sx={{
                fontSize: 48,
                mb: 2
              }}
            />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              Still Have Questions?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Can't find the answer you're looking for? Get in touch with our team.
            </Typography>
            <NextLink href="/contact" passHref>
              <CTAButton variant="contained" color="primary" size="large">
                Contact Support
              </CTAButton>
            </NextLink>
          </CTACard>
        </motion.div>
      </Container>
    </StyledSection>
  )
}
