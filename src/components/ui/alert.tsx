import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground [&>svg]:text-foreground",
        destructive:
          "bg-red-600 text-white border-red-700 dark:bg-red-800 dark:text-red-100 dark:border-red-700 [&>svg]:text-white dark:[&>svg]:text-red-100",
        warning:
          "bg-orange-600 text-white border-orange-700 dark:bg-orange-800 dark:text-orange-100 dark:border-orange-700 [&>svg]:text-white dark:[&>svg]:text-orange-100",
        info:
          "bg-blue-600 text-white border-blue-700 dark:bg-blue-800 dark:text-blue-100 dark:border-blue-700 [&>svg]:text-white dark:[&>svg]:text-blue-100",
        success:
          "bg-green-600 text-white border-green-700 dark:bg-green-800 dark:text-green-100 dark:border-green-700 [&>svg]:text-white dark:[&>svg]:text-green-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
