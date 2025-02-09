import { type PropertyListProps } from '@/types/property';
import { useIntl } from 'react-intl';

export default function PropertyList({ properties }: PropertyListProps) {
  const intl = useIntl();

  return (
    <ul>
      {properties.map((property) => (
        <li key={property.id}>
          {intl.formatMessage({ id: 'property.name' }, { name: property.name })}
        </li>
      ))}
    </ul>
  );
}
