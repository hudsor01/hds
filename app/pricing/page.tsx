"use client";

import { Button } from "@/components/ui/button"
import
  {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { routes } from "@/routes"
import { loadStripe } from "@stripe/stripe-js"
import * as feather from 'feather-icons'
import type { Route } from 'next'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

const pricingTiers = [
  {
    title: "Free Trial",
    description: "Perfect for evaluating our platform",
    price: "$0",
    duration: "14 days",
    priceId: null,
    features: [
      "Up to 3 properties",
      "Basic tenant management",
      "Simple maintenance tracking",
      "Basic financial reporting",
      "Email support",
    ],
    highlighted: false,
    buttonText: "Start Free Trial",
  },
  {
    title: "Core",
    description: "For individual landlords and small portfolios",
    price: "$29",
    duration: "per month",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_CORE,
    features: [
      "Up to 10 properties",
      "Advanced tenant screening",
      "Maintenance request system",
      "Basic financial analytics",
      "Document storage",
      "Email & chat support",
      "Mobile app access",
    ],
    highlighted: false,
    buttonText: "Subscribe Now",
  },
  {
    title: "Growth",
    description: "Ideal for growing property management businesses",
    price: "$69",
    duration: "per month",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_GROWTH,
    features: [
      "Up to 50 properties",
      "Everything in Core",
      "Automated rent collection",
      "Advanced financial analytics",
      "Document management",
      "Priority support",
      "Custom branding",
      "API access",
      "Team collaboration",
    ],
    highlighted: true,
    buttonText: "Get Started",
  },
  {
    title: "Elite",
    description: "For established property management companies",
    price: "$199",
    duration: "per month",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ELITE,
    features: [
      "Up to 100 properties",
      "Everything in Growth",
      "Advanced reporting",
      "Bulk operations",
      "Custom workflows",
      "Premium support",
      "White-label options",
      "Advanced API access",
      "Multi-user roles",
      "Data exports",
    ],
    highlighted: false,
    buttonText: "Contact Sales",
  },
  {
    title: "Unlimited",
    description: "Enterprise-grade solution for large portfolios",
    price: "Custom",
    duration: "per month",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_UNLIMITED,
    features: [
      "Unlimited properties",
      "Everything in Elite",
      "Enterprise SLA",
      "Dedicated account manager",
      "Custom integrations",
      "On-premise deployment option",
      "24/7 phone support",
      "Custom training",
      "Disaster recovery",
      "Advanced security features",
    ],
    highlighted: false,
    buttonText: "Contact Enterprise",
  },
];

export default function PricingPage() {
  // Initialize with Growth tier as selected (Most Popular)
  const [selectedTier, setSelectedTier] = useState<string>("Growth");

  return (
    <section className="py-16 container">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-roboto text-blue-500 mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your property management needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.title}
            className={`relative cursor-pointer transition-colors ${
              selectedTier === tier.title
                ? "border-blue-500 shadow-lg ring-2 ring-blue-500"
                : "border-border"
            }`}
            onClick={() => setSelectedTier(tier.title)}
          >
            {tier.highlighted && selectedTier === "Growth" && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{tier.title}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.price !== "Custom" && (
                  <span className="text-muted-foreground">/{tier.duration}</span>
                )}
              </div>
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span
                      className={selectedTier === tier.title ? "text-blue-500" : "text-gray-400"}
                      dangerouslySetInnerHTML={{
                        __html: feather.icons.check.toSvg({ width: 16, height: 16 })
                      }}
                    />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <PricingCheckoutButton
                priceId={tier.priceId ?? null}
                text={tier.buttonText}
                highlighted={selectedTier === tier.title}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

// Update the Button styles in PricingCheckoutButton component
const PricingCheckoutButton = ({
  priceId,
  text,
  highlighted,
}: {
  priceId: string | null;
  text: string;
  highlighted: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = async () => {
    try {
      setIsLoading(true);

      if (text === "Contact Sales") {
        router.push(routes.contact as Route);
        return;
      }

      if (!priceId) {
        if (!session) {
          router.push(routes.auth.register as Route);
          return;
        }

        toast.loading("Setting up your trial...");
        const response = await fetch("/api/subscribe/free", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trialDays: 14 }),
        });

        if (response.ok) {
          router.push('/dashboard' as Route);
          toast.success("Free trial activated! Enjoy your 14-day access.");
        } else {
          const error = await response.json();
          throw new Error(error.message || "Failed to activate trial");
        }
        return;
      }

      if (!session) {
        router.push(
          `${routes.auth.login}?callbackUrl=${encodeURIComponent("/pricing")}` as Route
        );
        return;
      }

      toast.loading("Preparing checkout...");
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment processing failed");
      }

      if (data.url) {
        window.location.href = data.url;
      } else if (data.sessionId) {
        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
        );
        await stripe?.redirectToCheckout({ sessionId: data.sessionId });
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Payment failed. Please try again."
      );
    } finally {
      setIsLoading(false);
      toast.dismiss();
    }
  };

  // In the PricingCheckoutButton component
  return (
    <Button
      variant={highlighted ? "default" : "outline"}
      onClick={handleClick}
      disabled={isLoading}
      className={`w-full mt-4 font-semibold transition-colors ${
        highlighted
          ? "bg-blue-500 hover:bg-blue-600 text-white"
          : "hover:border-blue-200"
      }`}
    >
      {isLoading ? "Processing..." : text}
    </Button>
  );
};
