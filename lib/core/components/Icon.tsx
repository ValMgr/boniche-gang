import React from 'react';

interface Props {
  icon: string;
  iconType?: 'filled' | 'outlined';
  className?: string;
}

export default function Icon({ icon, iconType = 'filled', className }: Props) {
  const iconSlug =
    iconType === 'filled' ? 'material-icons' : 'material-icons-outlined';

  return <span className={`${iconSlug} ${className}`}> {icon} </span>;
}
