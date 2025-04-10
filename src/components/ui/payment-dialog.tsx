"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Apple, Wallet } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  InnerDialog,
  InnerDialogTrigger,
  InnerDialogContent,
  InnerDialogHeader,
  InnerDialogFooter,
  InnerDialogTitle,
  InnerDialogDescription,
} from "@/components/ui/nested-dialog";
import type { OrderItem } from "./order-summary";
import type { CartItem } from "./interactive-checkout";

interface PaymentDialogProps {
  items: CartItem[];
  onCompletePayment?: (paymentMethod: string) => void;
  trigger?: React.ReactNode;
}

function convertCartItemsToOrderItems(cartItems: CartItem[]): OrderItem[] {
  return cartItems.map(item => ({
    name: item.name,
    color: item.color,
    size: "Standard",
    price: item.price,
    quantity: item.quantity,
  }));
}

function PaymentDialog({ items, onCompletePayment, trigger }: PaymentDialogProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState("creditcard");
  const [cardExpiry, setCardExpiry] = React.useState("");
  const orderItems = React.useMemo(() => convertCartItemsToOrderItems(items), [items]);

  // Handle card expiry input with format MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digits
    let formatted = '';

    if (input.length <= 2) {
      formatted = input;
    } else {
      formatted = `${input.slice(0, 2)}/${input.slice(2, 4)}`;
    }

    setCardExpiry(formatted);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button>Complete Payment</Button>}
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="border-b p-4">
          <DialogTitle>Payment</DialogTitle>
          <DialogDescription>
            Please enter your credit card credentials below to complete the payment process.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col">
            <Label className="mb-1.5 text-xs text-muted-foreground">
              Card Holder*
            </Label>
            <div className="relative">
              <Input placeholder="Card Holder Name" />
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="mb-1.5 text-xs text-muted-foreground">
              Card Number*
            </Label>
            <div className="relative">
              <Input
                placeholder="Card number"
                className="peer ps-9 [direction:inherit]"
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <CreditCard className="h-4 w-4" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <Label className="mb-1.5 text-xs text-muted-foreground">
                Expiration (MM/YY)*
              </Label>
              <Input
                placeholder="MM/YY"
                className="[direction:inherit]"
                value={cardExpiry}
                onChange={handleExpiryChange}
                maxLength={5}
              />
              <p className="text-xs text-muted-foreground mt-1">Type month then year (e.g. 0125 for Jan 2025)</p>
            </div>
            <div className="flex flex-col">
              <Label className="mb-1.5 text-xs text-muted-foreground">
                CVC*
              </Label>
              <Input placeholder="CVC" className="[direction:inherit]" maxLength={3} />
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col items-center justify-between space-y-2 border-t px-4 py-2 sm:flex-row sm:space-y-0">
          <InnerDialog>
            <InnerDialogTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Payment Method
              </Button>
            </InnerDialogTrigger>
            <InnerDialogContent className="-mt-6 p-0 sm:-mt-1">
              <InnerDialogHeader className="border-b p-4">
                <InnerDialogTitle>Choose a payment method</InnerDialogTitle>
                <InnerDialogDescription>
                  Select your preferred payment option
                </InnerDialogDescription>
              </InnerDialogHeader>

              <div className="flex flex-col gap-4 p-4">
                <RadioGroup
                  value={selectedPaymentMethod}
                  onValueChange={setSelectedPaymentMethod}
                >
                  <div
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 hover:bg-accent ${
                      selectedPaymentMethod === "creditcard" ? "bg-accent" : ""
                    }`}
                    onClick={() => setSelectedPaymentMethod("creditcard")}
                  >
                    <div className="flex items-center space-x-4">
                      <Wallet className="h-5 w-5" />
                      <div>
                        <h3 className="text-sm font-medium">Credit Card</h3>
                        <p className="text-sm text-muted-foreground">
                          Pay with Visa, Mastercard, or American Express
                        </p>
                      </div>
                    </div>
                    <RadioGroupItem value="creditcard" id="creditcard" />
                  </div>
                  <div
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 hover:bg-accent ${
                      selectedPaymentMethod === "paypal" ? "bg-accent" : ""
                    }`}
                    onClick={() => setSelectedPaymentMethod("paypal")}
                  >
                    <div className="flex items-center space-x-4">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <h3 className="text-sm font-medium">PayPal</h3>
                        <p className="text-sm text-muted-foreground">
                          Pay with your PayPal account
                        </p>
                      </div>
                    </div>
                    <RadioGroupItem value="paypal" id="paypal" />
                  </div>
                  <div
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 hover:bg-accent ${
                      selectedPaymentMethod === "applepay" ? "bg-accent" : ""
                    }`}
                    onClick={() => setSelectedPaymentMethod("applepay")}
                  >
                    <div className="flex items-center space-x-4">
                      <Apple className="h-5 w-5" />
                      <div>
                        <h3 className="text-sm font-medium">Apple Pay</h3>
                        <p className="text-sm text-muted-foreground">
                          Pay with Apple Pay
                        </p>
                      </div>
                    </div>
                    <RadioGroupItem value="applepay" id="applepay" />
                  </div>
                </RadioGroup>
              </div>

              <InnerDialogFooter className="flex flex-col items-center justify-between space-y-2 border-t px-4 py-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <DialogClose asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Cancel
                  </Button>
                </DialogClose>
                <Button className="w-full sm:w-auto">Continue</Button>
              </InnerDialogFooter>
            </InnerDialogContent>
          </InnerDialog>
          <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row">
            <DialogClose asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                className="w-full sm:w-auto"
                onClick={() => onCompletePayment?.(selectedPaymentMethod)}
              >
                Complete Payment
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { PaymentDialog };
