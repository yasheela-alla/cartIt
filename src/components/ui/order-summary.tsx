"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export interface OrderItem {
  name: string
  color: string
  size: string
  price: number
  quantity: number
  id?: string
}

export interface OrderSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  items: OrderItem[]
  shippingCost: number
  shippingDiscount: number
}

const OrderSummary = React.forwardRef<HTMLDivElement, OrderSummaryProps>(
  ({ items, shippingCost, shippingDiscount, className, ...props }, ref) => {
    const total = React.useMemo(() => {
      const subtotal = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
      return subtotal + shippingCost - shippingDiscount
    }, [items, shippingCost, shippingDiscount])

    const subtotal = React.useMemo(() => {
      return items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    }, [items])

    return (
      <Card
        ref={ref}
        className={cn("w-full rounded-md pt-6 shadow-none", className)}
        {...props}
      >
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={`${item.name}-${item.size}-${index}`} className="flex justify-between text-sm">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-muted-foreground">
                    {item.color} • Size {item.size} • Qty {item.quantity}
                  </p>
                </div>
                <p className="font-medium">RP {item.price.toLocaleString()}</p>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <p>Product Price ({items.length} Item)</p>
              <p>RP {subtotal.toLocaleString()}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping Cost Subtotal</p>
              <p>RP {shippingCost.toLocaleString()}</p>
            </div>
            <div className="flex justify-between text-green-600">
              <p>Shipping Discount</p>
              <p>-RP {shippingDiscount.toLocaleString()}</p>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between font-medium">
            <p>Total Sales</p>
            <p>RP {total.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
    )
  }
)

OrderSummary.displayName = "OrderSummary"

export { OrderSummary }
