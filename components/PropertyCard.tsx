// components/properties/card.tsx
'use client';

import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {Bath, BedDouble, MapPin, Square} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// components/properties/card.tsx

interface PropertyCardProps {
  id: string;
  title: string;
  address: string;
  imageUrl: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  status: 'available' | 'rented' | 'maintenance';
}

export default function PropertyCard({
  id,
  title,
  address,
  imageUrl,
  price,
  bedrooms,
  bathrooms,
  squareFeet,
  status,
}: PropertyCardProps) {
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    rented: 'bg-blue-100 text-blue-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <Card className='group overflow-hidden transition-all hover:shadow-lg'>
      <CardHeader className='p-0'>
        <div className='relative aspect-video overflow-hidden'>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-105'
          />
          <Badge className={`absolute right-2 top-2 ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='p-4'>
        <h3 className='mb-2 text-xl font-semibold'>{title}</h3>
        <div className='mb-4 flex items-center text-gray-500'>
          <MapPin className='mr-1 h-4 w-4' />
          <span className='text-sm'>{address}</span>
        </div>
        <div className='mb-4 grid grid-cols-3 gap-4 text-sm'>
          <div className='flex items-center'>
            <BedDouble className='mr-1 h-4 w-4' />
            <span>{bedrooms} Beds</span>
          </div>
          <div className='flex items-center'>
            <Bath className='mr-1 h-4 w-4' />
            <span>{bathrooms} Baths</span>
          </div>
          <div className='flex items-center'>
            <Square className='mr-1 h-4 w-4' />
            <span>{squareFeet} sqft</span>
          </div>
        </div>
        <p className='text-xl font-bold text-primary'>
          ${price.toLocaleString()}
          <span className='text-sm text-gray-500'>/month</span>
        </p>
      </CardContent>
      <CardFooter className='flex justify-between p-4'>
        <Button variant='outline' size='sm' asChild>
          <Link href={`/dashboard/properties/${id}`}>View Details</Link>
        </Button>
        <Button variant='default' size='sm' asChild>
          <Link href={`/dashboard/properties/${id}/edit`}>Manage Property</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
