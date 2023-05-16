import React from 'react';

interface Props {
  success: string;
}

export default function Success({ success }: Props) {
  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4">
      {success}
    </div>
  );
}
