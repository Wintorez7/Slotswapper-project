import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, TrendingUp, Users, Clock, Plus } from "lucide-react";

const DashboardPreview = () => {
  const stats = [
    {
      title: "Total Swaps",
      value: "127",
      subtitle: "Active swap requests",
      icon: Calendar,
      color: "text-gradient-cyan",
      trend: "+12% from last period"
    },
    {
      title: "Match Score",
      value: "95%",
      subtitle: "Across all analyses",
      icon: TrendingUp,
      color: "text-status-high",
      trend: "Top 10% globally"
    },
    {
      title: "Active Users",
      value: "1.2K",
      subtitle: "Ready to swap",
      icon: Users,
      color: "text-gradient-purple",
      trend: "+45% this month"
    },
    {
      title: "Time Saved",
      value: "48h",
      subtitle: "Total hours optimized",
      icon: Clock,
      color: "text-gradient-orange",
      trend: "Across your slots"
    },
  ];

  const recentSwaps = [
    { title: "Team Meeting - Product Review", date: "5/23/2025", status: "high", action: "+" },
    { title: "Client Call - Q2 Planning", date: "5/23/2025", status: "medium", action: "+" },
    { title: "Workshop - Design Sprint", date: "5/23/2025", status: "high", action: "+" },
    { title: "1:1 Session - Career Development", date: "5/23/2025", status: "medium", action: "+" },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your Swapping Dashboard
          </h2>
          <p className="text-muted-foreground text-lg">
            Track your time slot exchanges and match opportunities in real-time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-hover border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mb-2">{stat.subtitle}</p>
                    <p className="text-xs text-status-high">{stat.trend}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Recent Swap Opportunities</CardTitle>
                  <Button variant="outline" size="sm">
                    New Analysis
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentSwaps.map((swap, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{swap.title}</div>
                          <div className="text-xs text-muted-foreground">{swap.date}</div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={
                            swap.status === "high" 
                              ? "border-status-high text-status-high" 
                              : "border-status-medium text-status-medium"
                          }
                        >
                          {swap.status === "high" ? "95%" : "82%"}
                        </Badge>
                      </div>
                      <Button size="sm" variant="ghost" className="ml-2">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;
