import * as React from 'react';

import { cn } from '@/lib/utils';

//Creates wooden card used in hint dialgo
const WoodenCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg bg-card text-card-foreground shadow-sm card bg-card-background disable-blur bg-contain border-[15px] border-b-[#3e332a] border-x-[#554639] border-t-[#796a59]',
      className
    )}
    {...props}
  />
));
WoodenCard.displayName = 'WoodenCard';

const WoodenCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
WoodenCardHeader.displayName = 'WoodenCardHeader';

const WoodenCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
WoodenCardTitle.displayName = 'WoodenCardTitle';

const WoodenCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
WoodenCardDescription.displayName = 'WoodenCardDescription';

const WoodenCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
WoodenCardContent.displayName = 'WoodenCardContent';

const WoodenCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
WoodenCardFooter.displayName = 'WoodenCardFooter';

export {
  WoodenCard,
  WoodenCardHeader,
  WoodenCardFooter,
  WoodenCardTitle,
  WoodenCardDescription,
  WoodenCardContent
};
