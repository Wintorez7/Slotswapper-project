import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Amina Yusuf",
      role: "Freelance Developer",
      content: "SlotSwapper's feedback felt like working with a real coach. I now recommend SlotSwapper to everyone managing busy calendars.",
      avatar: "AY"
    },
    {
      name: "Ethan Brooks",
      role: "Business Analyst",
      content: "Fast, easy, and genuinely useful. I've tried a few swap tools, but SlotSwapper gave the most actionable and relevant feedback.",
      avatar: "EB"
    },
    {
      name: "Sophia Adams",
      role: "Freelance Copywriter",
      content: "What I loved most is how it tailored suggestions based on my job title and industry. SlotSwapper feels personal, not generic.",
      avatar: "SA"
    },
    {
      name: "Jessica Lin",
      role: "UX Specialist",
      content: "SlotSwapper gave my schedule a professional polish. The AI feedback was spot on and helped me optimize my time in just two weeks.",
      avatar: "JL"
    },
    {
      name: "Carlos Diaz",
      role: "Project Coordinator",
      content: "SlotSwapper's AI caught small mistakes I didn't even notice. My calendar now looks sharper and more targeted to the slots I want.",
      avatar: "CD"
    },
    {
      name: "Fatima Noor",
      role: "Marketing Manager",
      content: "Within a day of applying with my updated calendar, I started getting matches. SlotSwapper works like magic.",
      avatar: "FN"
    },
    {
      name: "Raj Mehta",
      role: "Backend Developer",
      content: "As a career switcher, I wasn't sure how to tailor my schedule. SlotSwapper not only highlighted what to fix but suggested changes that made a real impact.",
      avatar: "RM"
    },
    {
      name: "Liam O'Connor",
      role: "Finance Analyst",
      content: "I used SlotSwapper before applying for internships. The suggestions were incredibly helpful and boosted my confidence big time.",
      avatar: "LO"
    },
    {
      name: "Priya Sharma",
      role: "Computer Science Student",
      content: "SlotSwapper AI analysis helped me reframe my freelance experience into strong accomplishments. Loved the insights!",
      avatar: "PS"
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
          className="text-center mb-16"
        >
          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What our users say
          </h2>
          <p className="text-muted-foreground">
            See what our customers have to say about us.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur card-hover">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
