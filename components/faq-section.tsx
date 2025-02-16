'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Card,
  Button
} from '@mui/material'
import {
  ExpandMore as ExpandMoreIcon,
  Info as InfoIcon,
  LiveHelp as LiveHelpIcon
} from '@mui/icons-material'
import Link from 'next/link'

interface FAQ {
  question: string
  answer: string
  category?: string
}

const faqs: FAQ[] = [
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes to upgraded plans take effect immediately, while downgrades are applied at the start of your next billing cycle. All your data and settings will be preserved when switching plans.",
    category: "Billing"
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial on all plans with full access to all features. No credit card is required to start your trial. You can upgrade to a paid plan at any time during or after your trial period.",
    category: "Getting Started"
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), ACH bank transfers, and wire transfers for enterprise customers. All payments are processed securely through Stripe.",
    category: "Billing"
  },
  {
    question: "How secure is my data?",
    answer: "We take security seriously. Your data is encrypted at rest and in transit using industry-standard protocols. We use AWS for hosting with regular backups, and comply with SOC 2 Type II standards. Two-factor authentication is available for all accounts.",
    category: "Security"
  },
  {
    question: "Do you offer customization options?",
    answer: "Yes, particularly on our Professional and Enterprise plans. This includes custom fields, workflow automation rules, and API access. Enterprise customers also get access to custom integrations and dedicated support for specific requirements.",
    category: "Features"
  },
  {
    question: "What kind of support is included?",
    answer: "All plans include email support. Professional plans include priority support with faster response times. Enterprise plans get 24/7 phone support and a dedicated account manager. We also provide extensive documentation and video tutorials.",
    category: "Support"
  },
  {
    question: "Can I import my existing data?",
    answer: "Yes, we provide tools to import data from Excel/CSV files and popular property management software. Enterprise customers get assisted data migration. Our team can help you plan and execute the migration process.",
    category: "Getting Started"
  },
  {
    question: "Is there a limit to the number of users?",
    answer: "Basic plans include 2 user accounts, Professional plans include 5 users, and Enterprise plans have unlimited users. Additional user licenses can be purchased on any plan.",
    category: "Features"
  },
  {
    question: "Do you provide integration support?",
    answer: "Yes, we offer integrations with popular accounting software, payment processors, and property listing platforms. Enterprise plans include custom integration development and API access.",
    category: "Features"
  },
  {
    question: "What happens to my data if I cancel?",
    answer: "You have 30 days after cancellation to export your data. After that period, data is permanently deleted in accordance with our data retention policies. We provide export tools to help you backup your information.",
    category: "Security"
  }
]

export function FAQSection() {
  const theme = useTheme()
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false)
  }

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    const category = faq.category || 'General'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(faq)
    return acc
  }, {} as Record<string, FAQ[]>)

  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 8, md: 12 }
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            align="center"
            gutterBottom
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
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
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <InfoIcon />
                {category}
              </Typography>

              <Card 
                elevation={0}
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 2
                }}
              >
                {categoryFaqs.map((faq, index) => (
                  <Accordion
                    key={index}
                    expanded={expanded === `${category}-${index}`}
                    onChange={handleChange(`${category}-${index}`)}
                    sx={{
                      background: 'transparent',
                      boxShadow: 'none',
                      '&:before': {
                        display: 'none',
                      },
                      '&:not(:last-child)': {
                        borderBottom: `1px solid ${theme.palette.divider}`
                      }
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        '& .MuiAccordionSummary-content': {
                          my: 2
                        }
                      }}
                    >
                      <Typography variant="h6">
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                              pb: 2,
                              maxWidth: '90%',
                              lineHeight: 1.7
                            }}
                          >
                            {faq.answer}
                          </Typography>
                        </motion.div>
                      </AnimatePresence>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Card>
            </motion.div>
          </Box>
        ))}

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              mt: 8,
              p: 4,
              textAlign: 'center',
              bgcolor: 'background.paper',
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <LiveHelpIcon 
              color="primary" 
              sx={{ 
                fontSize: 48,
                mb: 2
              }}
            />
            <Typography variant="h4" gutterBottom>
              Still Have Questions?
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Can't find the answer you're looking for? Get in touch with our team.
            </Typography>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '50px',
                textTransform: 'none',
                fontSize: '1.1rem'
              }}
            >
              Contact Support
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}