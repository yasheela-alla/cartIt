"use client";

import React, { useState } from "react";
import { InteractiveCheckout, type CartItem } from "@/components/ui/interactive-checkout";
import { PaymentDialog } from "@/components/ui/payment-dialog";
import { CardDetails } from "@/components/ui/card-details";
import type { OrderItem } from "@/components/ui/order-summary";
import { OrderConfirmation } from "@/components/order-confirmation";
import { CheckCircle, CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper function to generate order number
const generateOrderNumber = () => {
  return `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
};

// Helper function to get current date formatted
const getCurrentDate = () => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Helper function to get estimated delivery date (7 days from now)
const getEstimatedDelivery = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

function convertCartItemsToOrderItems(cartItems: CartItem[]): OrderItem[] {
  return cartItems.map(item => ({
    name: item.name,
    color: item.color,
    size: "Standard",
    price: item.price,
    quantity: item.quantity,
    id: item.id,
  }));
}

type CheckoutStep = 'cart' | 'payment' | 'confirmation';

const steps: { id: CheckoutStep; label: string }[] = [
  { id: 'cart', label: 'Shopping Cart' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirmation', label: 'Confirmation' },
];

function CheckoutSteps({ currentStep }: { currentStep: CheckoutStep }) {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  currentStep === step.id ? "bg-blue-600 text-white" :
                    index < steps.findIndex(s => s.id === currentStep) ? "bg-green-600 text-white" : "bg-zinc-200 dark:bg-zinc-800"
                )}
              >
                {index < steps.findIndex(s => s.id === currentStep) ? (
                  <CheckCircle className="w-4 h-4" />
                ) : currentStep === step.id ? (
                  <span className="text-sm font-medium">{index + 1}</span>
                ) : (
                  <CircleDashed className="w-4 h-4 text-zinc-400" />
                )}
              </div>
              <span className={cn(
                "text-xs mt-1",
                currentStep === step.id ? "font-medium text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400"
              )}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "w-12 h-0.5 mx-1",
                index < steps.findIndex(s => s.id === currentStep) ? "bg-green-600" : "bg-zinc-200 dark:bg-zinc-800"
              )} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('creditcard');

  const handleCheckout = (items: CartItem[]) => {
    setCartItems(items);
    setCheckoutStep('payment');
  };

  const handleCompletePayment = (selectedPaymentMethod: string) => {
    setPaymentMethod(selectedPaymentMethod);
    setOrderNumber(generateOrderNumber());
    setCheckoutStep('confirmation');
  };

  const handleContinueShopping = () => {
    setCartItems([]);
    setCheckoutStep('cart');
  };

  const handleBackToCart = () => {
    setCheckoutStep('cart');
  };

  const renderContent = () => {
    switch (checkoutStep) {
      case 'cart': {
        return <InteractiveCheckout onCheckout={handleCheckout} />;
      }
      case 'payment': {
        const orderItems = convertCartItemsToOrderItems(cartItems);
        const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        return (
          <div className="flex flex-col-reverse lg:flex-row gap-8 justify-center">
            <div className="w-full lg:w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Payment Method</h2>
                <button
                  onClick={handleBackToCart}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Back to Cart
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <PaymentDialog
                  items={cartItems}
                  onCompletePayment={handleCompletePayment}
                  trigger={
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                      Complete Payment
                    </button>
                  }
                />
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Saved Payment Methods</h3>
                  <CardDetails />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 bg-white dark:bg-zinc-900 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-md relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">{item.name}</p>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          {item.color} • Qty {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$25.00</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-$10.00</span>
                  </div>
                  <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-800 pt-2 font-semibold">
                    <span>Total</span>
                    <span>${(subtotal + 25 - 10).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      case 'confirmation': {
        return (
          <OrderConfirmation
            orderNumber={orderNumber}
            orderItems={convertCartItemsToOrderItems(cartItems)}
            orderDate={getCurrentDate()}
            estimatedDelivery={getEstimatedDelivery()}
            paymentMethod={paymentMethod}
            shippingCost={25000}
            shippingDiscount={10000}
            onContinueShopping={handleContinueShopping}
          />
        );
      }
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">cartIt Checkout</h1>
      <CheckoutSteps currentStep={checkoutStep} />
      {renderContent()}
    </div>
  );
}
