import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { RotateCw, Zap, TrendingUp } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: RotateCw,
      title: "Daily Reset",
      description: "Free users get 5 swaps per month, while Premium users get unlimited swaps per day. Swaps reset at midnight."
    },
    {
      icon: Zap,
      title: "Swap Usage",
      description: "Each slot swap request costs 1 credit. Premium users get higher quality matches and more detailed compatibility feedback."
    },
    {
      icon: TrendingUp,
      title: "No Accumulation",
      description: "Unused swaps don't roll over to the next day. Each day starts fresh with your maximum credit allocation."
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">Swap System Explained</CardTitle>
            <p className="text-sm text-muted-foreground">How your swaps work</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-primary/5 rounded-lg p-6 border border-primary/20"
            >
              <Badge variant="outline" className="mb-3 border-primary/50 text-primary">
                Pro Tip
              </Badge>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Premium users get 5x more daily swaps (25 vs 5) and access to advanced features like detailed 
                compatibility optimization and smart scheduling suggestions. Upgrade today to maximize your calendar 
                optimization success!
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HowItWorksSection;
