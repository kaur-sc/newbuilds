import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean
}

export function Section({ className, container = true, children, ...props }: SectionProps) {
  const content = container ? <Container>{children}</Container> : children

  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      {content}
    </section>
  )
}
