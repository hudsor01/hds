import {
    Apartment as ApartmentIcon,
    Security as SecurityIcon,
    TrendingUp as TrendingUpIcon,
    SupportAgent as SupportIcon,
    Speed as SpeedIcon,
    DeviceHub as IntegrationIcon
} from '@mui/icons-material'

export const features = [
    {
        icon: <ApartmentIcon />,
        title: 'Property Management',
        description:
            'Efficiently manage your properties, units, and tenants all in one place.',
        color: '#2563EB',
        details: [
            'Comprehensive property portfolio management',
            'Unit and tenant tracking',
            'Maintenance request handling',
            'Document storage and management',
            'Financial tracking and reporting',
            'Automated rent collection'
        ]
    },
    {
        icon: <SecurityIcon />,
        title: 'Enterprise Security',
        description:
            'Bank-level security with end-to-end encryption, two-factor authentication, and automated backups.',
        color: '#7C3AED',
        details: [
            'End-to-end encryption',
            'Two-factor authentication',
            'Regular security audits',
            'Automated backups',
            'GDPR compliance',
            'Role-based access control'
        ]
    },
    {
        icon: <TrendingUpIcon />,
        title: 'Advanced Analytics',
        description:
            'Make data-driven decisions with real-time insights, custom reports, and predictive analytics.',
        color: '#059669',
        details: [
            'Real-time performance dashboards',
            'Custom report generation',
            'Predictive analytics',
            'Market trend analysis',
            'Occupancy rate tracking',
            'Revenue forecasting'
        ]
    },
    {
        icon: <SupportIcon />,
        title: '24/7 Support',
        description:
            'Dedicated support team ready to assist you around the clock for any questions or issues.',
        color: '#DC2626',
        details: [
            '24/7 customer support',
            'Live chat assistance',
            'Priority ticket handling',
            'Dedicated account manager',
            'Training and onboarding',
            'Regular check-ins'
        ]
    },
    {
        icon: <SpeedIcon />,
        title: 'High Performance',
        description:
            'Lightning-fast performance optimized for managing large property portfolios efficiently.',
        color: '#0891B2',
        details: [
            'Fast load times',
            'Real-time updates',
            'Optimized database queries',
            'Efficient resource utilization',
            'Scalable infrastructure',
            'Performance monitoring'
        ]
    },
    {
        icon: <IntegrationIcon />,
        title: 'Smart Integrations',
        description:
            'Seamlessly integrate with your existing tools and workflows for maximum productivity.',
        color: '#C026D3',
        details: [
            'QuickBooks integration',
            'Stripe payment processing',
            'DocuSign integration',
            'Calendar synchronization',
            'Email integration',
            'API access'
        ]
    }
]
