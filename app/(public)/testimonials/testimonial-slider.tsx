'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'

interface Testimonial {
    name: string
    role: string
    company: string
    content: string
    avatar: string
}

interface TestimonialSliderProps {
    testimonials: Testimonial[]
}

export function TestimonialSlider({
    testimonials
}: TestimonialSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    }

    const swipeConfidenceThreshold = 10000
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity
    }

    const paginate = (newDirection: number) => {
        setDirection(newDirection)
        setCurrentIndex(prevIndex => {
            const nextIndex = prevIndex + newDirection
            if (nextIndex < 0) return testimonials.length - 1
            if (nextIndex >= testimonials.length) return 0
            return nextIndex
        })
    }

    return (
        <div className="relative mx-auto max-w-4xl px-4">
            <div className="relative h-[400px] overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: {
                                type: 'spring',
                                stiffness: 300,
                                damping: 30
                            },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(
                                offset.x,
                                velocity.x
                            )

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1)
                            } else if (
                                swipe > swipeConfidenceThreshold
                            ) {
                                paginate(-1)
                            }
                        }}
                        className="absolute w-full"
                    >
                        <Card className="mx-auto max-w-3xl">
                            <CardContent className="p-8">
                                <div className="relative">
                                    <FormatQuoteIcon
                                        className="text-primary/20 absolute -top-4 -left-4 h-8 w-8"
                                        fontSize="large"
                                    />
                                    <Typography
                                        variant="body1"
                                        className="mb-6 text-lg italic"
                                    >
                                        {
                                            testimonials[currentIndex]
                                                .content
                                        }
                                    </Typography>
                                </div>
                                <div className="mt-6 flex items-center gap-4">
                                    <Avatar
                                        src={
                                            testimonials[currentIndex]
                                                .avatar
                                        }
                                        alt={
                                            testimonials[currentIndex]
                                                .name
                                        }
                                        className="h-12 w-12"
                                    />
                                    <div>
                                        <Typography
                                            variant="subtitle1"
                                            className="font-semibold"
                                        >
                                            {
                                                testimonials[
                                                    currentIndex
                                                ].name
                                            }
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {
                                                testimonials[
                                                    currentIndex
                                                ].role
                                            }{' '}
                                            at{' '}
                                            {
                                                testimonials[
                                                    currentIndex
                                                ].company
                                            }
                                        </Typography>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute right-0 bottom-0 left-0 flex justify-center gap-4 pb-4">
                <IconButton
                    onClick={() => paginate(-1)}
                    className="bg-background/80 rounded-full backdrop-blur-sm"
                    size="large"
                >
                    <ArrowBackIcon />
                </IconButton>
                <IconButton
                    onClick={() => paginate(1)}
                    className="bg-background/80 rounded-full backdrop-blur-sm"
                    size="large"
                >
                    <ArrowForwardIcon />
                </IconButton>
            </div>

            <div className="mt-6 flex justify-center gap-2">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(
                                index > currentIndex ? 1 : -1
                            )
                            setCurrentIndex(index)
                        }}
                        className={`h-2 w-2 rounded-full transition-all ${index === currentIndex ? 'bg-primary w-4' : 'bg-primary/20'}`}
                    />
                ))}
            </div>
        </div>
    )
}
