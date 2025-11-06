import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const TechnologySection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">
            Built with Advanced Technology
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powered by Secure Cloud Infrastructure
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            SlotSwapper combines cutting-edge cloud technologies and robust infrastructure to 
            deliver accurate slot matching and real-time synchronization
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center items-center gap-12 flex-wrap mb-12"
          >
            <Card className="w-32 h-32 flex items-center justify-center bg-card/50 backdrop-blur border-border/50 card-hover">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-gradient-orange flex items-center justify-center">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gradient-orange"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gradient-orange"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gradient-orange"/>
                  </svg>
                </div>
                <p className="text-sm font-semibold">Node.js</p>
              </div>
            </Card>

            <Card className="w-32 h-32 flex items-center justify-center bg-card/50 backdrop-blur border-border/50 card-hover">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#D4A373] to-[#8B7355] flex items-center justify-center text-xl font-bold text-white">
                  DB
                </div>
                <p className="text-sm font-semibold">MongoDB</p>
              </div>
            </Card>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-muted-foreground max-w-2xl mx-auto"
          >
            Our platform leverages modern technologies to provide the most accurate and reliable 
            slot swapping experience available
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologySection;
