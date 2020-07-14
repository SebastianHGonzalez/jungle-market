import React from 'react';
import { useRouter } from 'next/router';
import Button from './input/Button';

type Props = React.Props<never>

export default function BackButton({
  children,
}: Props) {
  const { back } = useRouter();

  return (
    <Button onClick={back} variant="flat" color="neutral">
      {children || <>&lt;</>}
    </Button>
  );
}
