import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

//Custom button styling

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground w-2 font-semibold text-[#412f1e] px-[2em] py-[1.25em] bg-[#fffef0] border-[2px] border-[solid] border-[#716151] rounded-[0.75em] [transition:transform_0.15s] [transform-style:preserve-3d] before:absolute before:content-none before:w-full before:h-full before:top-[0] before:left-[0] before:right-[0] before:bottom-[0] before:bg-[#bea271] before:[border-radius:inherit] before:[box-shadow:0_0_0_2px_#716151] before:[transform:translate3d(0,_0.75em,_-1em)] before:[transition:transform_0.15s,_box-shadow_0.15s] hover:bg-[#fff6e9] hover:translate-x-[0] hover:translate-y-[0.25em] hover:text-[rgb(154,_70,_18)] before:[box-shadow:0_0_0_2px_#716151] before:[transform:translate3d(0,_0.5em,_-1em)] active:bg-[#fff5e9] active:translate-x-[0em] active:translate-y-[0.75em] active:text-[rgb(91,_44,_15)] before:[box-shadow:0_0_0_2px_#716151,_0_0_#fffce2] before:[transform:translate3d(0,_0,_-1em)]',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
