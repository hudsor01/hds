import {Icon} from './icon';

export function IconExample() {
  return (
    <div className='flex gap-4 items-center p-4'>
      <Icon name='Heart' className='text-red-500 hover:text-red-600' />
      <Icon name='Mail' className='text-blue-500 hover:text-blue-600' />
      <Icon name='GitHub' className='text-gray-700 hover:text-gray-800' size={32} />
      <Icon name='AlertCircle' className='text-yellow-500 hover:text-yellow-600' />
      <Icon name='Check' className='text-green-500 hover:text-green-600' />
    </div>
  );
}
