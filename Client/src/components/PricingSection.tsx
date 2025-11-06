import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for occasional slot swappers",
      features: [
        "5 swap requests per month",
        "Basic match scoring",
        "Calendar integration",
        "Email notifications"
      ],
      buttonText: "Current Plan",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      price: "$5",
      originalPrice: "$9.99",
      period: "/month",
      description: "For frequent calendar optimizers",
      features: [
        "Unlimited swap requests",
        "Advanced match scoring",
        "Priority matching algorithm",
        "Priority support",
        "Export to PDF",
        "Smart scheduling suggestions (coming soon)",
        "Auto-swap preferences (coming soon)",
        "Team collaboration features (coming soon)"
      ],
      buttonText: "Upgrade Now",
      buttonVariant: "default" as const,
      popular: true
    }
  ];

  return (
    <section className="py-20 px-6 bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Subscription</h2>
          <p className="text-muted-foreground">
            Manage your subscription plan and billing
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 right-6 z-10">
                  <Badge className="bg-destructive text-destructive-foreground border-0 px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              <Card className={`h-full ${plan.popular ? 'border-primary/50' : 'border-border/50'} bg-card/50 backdrop-blur`}>
                <CardHeader className="pb-6">
                  <div>
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  <div className="mt-4">
                    {plan.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through mr-2">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className={plan.popular ? "text-status-high" : "text-muted-foreground"}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={plan.buttonVariant}
                    className="w-full"
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
