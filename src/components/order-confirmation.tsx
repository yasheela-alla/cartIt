"use client";

import { CheckCircle, Truck, Box, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type OrderItem, OrderSummary } from "@/components/ui/order-summary";
import Link from "next/link";

interface OrderConfirmationProps {
  orderNumber: string;
  orderItems: OrderItem[];
  orderDate: string;
  estimatedDelivery: string;
  paymentMethod: string;
  shippingCost: number;
  shippingDiscount: number;
  onContinueShopping: () => void;
}

export function OrderConfirmation({
  orderNumber,
  orderItems,
  orderDate,
  estimatedDelivery,
  paymentMethod,
  shippingCost,
  shippingDiscount,
  onContinueShopping,
}: OrderConfirmationProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
        <div className="p-6 flex flex-col items-center text-center">
          <div className="mb-4 h-12 w-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-500" />
          </div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Order Complete!</h1>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
            Thank you for your order! Your order number is {orderNumber}
          </p>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
            We have sent a confirmation email to your registered email address.
          </p>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="p-6">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50 mb-4">Order Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 bg-zinc-50 dark:bg-zinc-800/50">
                  <div className="mt-0.5">
                    <Truck className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Shipping Information</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Estimated delivery: {estimatedDelivery}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Order placed: {orderDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 bg-zinc-50 dark:bg-zinc-800/50">
                  <div className="mt-0.5">
                    <CreditCard className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Payment Information</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Payment Method: {paymentMethod}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Billing address: Same as shipping address
                    </p>
                  </div>
                </div>
              </div>
              <OrderSummary
                items={orderItems}
                shippingCost={shippingCost}
                shippingDiscount={shippingDiscount}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 p-6 flex flex-col sm:flex-row justify-between gap-4">
          <Button variant="outline" className="w-full sm:w-auto" onClick={onContinueShopping}>
            Continue Shopping
          </Button>
          <Link href="#" className="w-full sm:w-auto">
            <Button className="w-full">Track Order</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
