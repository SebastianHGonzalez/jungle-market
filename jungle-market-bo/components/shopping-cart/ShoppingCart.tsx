import React from 'react';

interface Props extends React.Props<never> {
  id: string;
}
export default function ShoppingCart({
  id,
}: Props) {
  return (
    <div>
      ShoppingCart: {id}
    </div>
  );
}
