import React from 'react';

interface Props {
  error: string;
}

export default function Error({ error }: Props) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
      {error}
    </div>
  );
}
