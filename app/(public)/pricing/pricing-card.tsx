'use client'

import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { motion } from 'framer-motion'

interface PricingPlan {
    name: string
    price: number
    features: string[]
}

interface PricingCardProps {
    plan: PricingPlan
    popular?: boolean
}

export function PricingCard({
    plan,
    popular = false
}: PricingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
        >
            <Card
                className={`h-full transform transition-all duration-200 ${popular ? 'border-primary shadow-lg' : ''}`}
                elevation={popular ? 8 : 1}
            >
                <CardContent className="p-6">
                    {popular && (
                        <div className="bg-primary/10 text-primary mb-4 rounded-full px-3 py-1 text-center text-sm">
                            Most Popular
                        </div>
                    )}

                    <Typography
                        variant="h5"
                        component="h3"
                        className="mb-2 font-bold"
                    >
                        {plan.name}
                    </Typography>

                    <Typography
                        variant="h4"
                        component="div"
                        className="mb-4"
                    >
                        ${plan.price}
                        <span className="text-muted-foreground text-sm">
                            /month
                        </span>
                    </Typography>

                    <div className="space-y-3">
                        {plan.features.map(feature => (
                            <div
                                key={feature}
                                className="flex items-center gap-2"
                            >
                                <CheckCircleIcon className="text-primary h-5 w-5" />
                                <Typography variant="body2">
                                    {feature}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </CardContent>

                <CardActions className="border-t p-6">
                    <Button
                        variant={popular ? 'contained' : 'outlined'}
                        color="primary"
                        fullWidth
                        href={`/signup?plan=${encodeURIComponent(plan.name.toLowerCase())}`}
                    >
                        Get Started
                    </Button>
                </CardActions>
            </Card>
        </motion.div>
    )
}
