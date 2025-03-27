import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import {
  Shield,
  Lock,
  CheckCircle,
  ArrowRight,
  UserPlus,
  RefreshCcw,
  Server,
  Key,
  Menu,
  X,
  LogOut,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Logo from "../components/Logo";
import { useAuth } from "../contexts/AuthContext";

// Custom hook for animations when element comes into view
const useAnimateInView = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return { ref, controls, isInView };
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const iconAnimations = {
  hover: { scale: 1.05, rotate: 5, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

const Home = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const heroAnimation = useAnimateInView();
  const featuresAnimation = useAnimateInView();
  const metricsAnimation = useAnimateInView();
  const ctaAnimation = useAnimateInView();
  const trustAnimation = useAnimateInView();

  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const patternParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const getUserInitials = () => {
    if (!user || !user.name) return "U";

    const nameParts = user.name.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`;
    }
    return nameParts[0][0];
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Abstract Pattern Background */}
      <div className="absolute inset-0 z-0 pointer-events-none grid-pattern opacity-70"></div>
      <div className="absolute right-0 top-0 w-full h-full z-0 pointer-events-none">
        <motion.div
          className="absolute right-0 top-0 w-2/3 h-2/3 rounded-full bg-primary/5 filter blur-[120px] mask-radial-faded"
          style={{ y: patternParallax }}
        />
        <motion.div
          className="absolute left-0 bottom-0 w-2/3 h-2/3 rounded-full bg-purple-500/5 filter blur-[120px] mask-radial-faded"
          style={{ y: patternParallax }}
        />
      </div>

      {/* Header/Nav */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Logo animated={true} size="md" />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#security"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Security
            </a>
            <a
              href="#trust"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Trust
            </a>
            {/* User Menu or Auth Links */}
          </nav>
          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2 md:hidden">
              <Button asChild size="sm" variant="outline">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 relative z-10 overflow-hidden">
        <div className="container px-4">
          <motion.div
            ref={heroAnimation.ref}
            initial="hidden"
            animate={heroAnimation.controls}
            variants={staggerContainer}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            <div className="flex-1 space-y-6 md:pr-8">
              <motion.span
                variants={fadeInUp}
                className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2"
              >
                Security Simplified
              </motion.span>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                Keep your data <span className="gradient-text">protected</span>{" "}
                with Guard
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-muted-foreground"
              >
                Enterprise-grade protection for your business data, made simple.
                Our automated backup system ensures your data is always secure
                and recoverable.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 pt-4 items-center justify-center sm:justify-start"
              >
                <Button asChild size="lg" className="gap-2">
                  <Link to={`${isAuthenticated ? "/dashboard" : "/register"}`}>
                    Get Started
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#features">Explore Features</a>
                </Button>
              </motion.div>
            </div>
            <motion.div
              variants={fadeInUp}
              className="flex-1 flex justify-center relative"
              style={{ y: heroParallax }}
            >
              <div className="relative w-full max-w-lg aspect-square">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                ></motion.div>
                <motion.div
                  className="glow-effect relative bg-card border border-border/40 rounded-3xl overflow-hidden shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-8 relative z-10">
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="col-span-2 flex items-center space-x-4 mb-4">
                        <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Shield className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">
                            Guard Dashboard
                          </h3>
                          <p className="text-muted-foreground">
                            Security status: Protected
                          </p>
                        </div>
                      </div>

                      {[
                        {
                          icon: (
                            <RefreshCcw className="h-5 w-5 text-green-500" />
                          ),
                          label: "Real-time backups",
                          color: "bg-green-500/10",
                        },
                        {
                          icon: <Lock className="h-5 w-5 text-primary" />,
                          label: "Encryption active",
                          color: "bg-primary/10",
                        },
                        {
                          icon: <Server className="h-5 w-5 text-amber-500" />,
                          label: "Database secure",
                          color: "bg-amber-500/10",
                        },
                        {
                          icon: <Key className="h-5 w-5 text-purple-500" />,
                          label: "Access control",
                          color: "bg-purple-500/10",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-xl bg-card border border-border/50 flex items-center space-x-3"
                        >
                          <div
                            className={`h-8 w-8 rounded-lg ${item.color} flex items-center justify-center`}
                          >
                            {item.icon}
                          </div>
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="w-full bg-muted/50 h-14 rounded-lg flex items-center px-4">
                      <motion.div
                        className="w-full bg-gradient-to-r from-green-200 to-green-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 2, delay: 0.5 }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Data protection status: 85% complete
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-muted/30 relative z-10">
        <div className="container px-4">
          <motion.div
            ref={metricsAnimation.ref}
            initial="hidden"
            animate={metricsAnimation.controls}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { metric: "99.9%", label: "Uptime guarantee", icon: <Server /> },
              { metric: "10M+", label: "Records protected", icon: <Shield /> },
              { metric: "24/7", label: "Monitoring & support", icon: <Lock /> },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                  whileHover="hover"
                  whileTap="tap"
                  variants={iconAnimations}
                >
                  <div className="h-7 w-7 text-primary">{item.icon}</div>
                </motion.div>
                <h3 className="text-3xl font-bold mb-1">{item.metric}</h3>
                <p className="text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative z-10">
        <div className="container px-4">
          <motion.div
            ref={featuresAnimation.ref}
            initial="hidden"
            animate={featuresAnimation.controls}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4"
            >
              Key Features
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">
              Why Choose <span className="gradient-text">Guard</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground"
            >
              Our robust platform offers all the security features your business
              needs
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={featuresAnimation.controls}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Shield className="h-6 w-6 text-primary" />,
                title: "Multi-Database Support",
                description:
                  "PostgreSQL, MySQL, MongoDB, SQLite, and more. We support all major database systems.",
              },
              {
                icon: <RefreshCcw className="h-6 w-6 text-primary" />,
                title: "Automated Scheduling",
                description:
                  "Set it and forget it. Schedule backups at intervals that work for your business.",
              },
              {
                icon: <Lock className="h-6 w-6 text-primary" />,
                title: "Enterprise Security",
                description:
                  "End-to-end encryption ensures your data remains secure throughout the backup process.",
              },
              {
                icon: <Server className="h-6 w-6 text-primary" />,
                title: "Smart Storage",
                description:
                  "Efficient storage usage with incremental backups and intelligent compression.",
              },
              {
                icon: <Key className="h-6 w-6 text-primary" />,
                title: "Access Controls",
                description:
                  "Fine-grained permissions let you control who can access and restore backups.",
              },
              {
                icon: <UserPlus className="h-6 w-6 text-primary" />,
                title: "Team Collaboration",
                description:
                  "Work together with your team to manage backups and ensure data protection.",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-border/50 h-full transition-all hover:shadow-md hover:border-primary/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardContent className="pt-6 relative z-10">
                    <div className="flex flex-col items-center text-center h-full space-y-4">
                      <motion.div
                        className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                        whileHover="hover"
                        whileTap="tap"
                        variants={iconAnimations}
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="text-xl font-medium mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-24 bg-muted/30 relative z-10">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                className="relative aspect-square max-w-lg mx-auto"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute inset-4 border border-primary/20 rounded-3xl"></div>
                <div className="relative h-full w-full bg-card border border-border/50 rounded-3xl shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                  <div className="p-8 relative z-10 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                      <Shield className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-medium">
                        Security Dashboard
                      </h3>
                    </div>

                    <div className="flex-grow grid grid-cols-2 gap-4">
                      {[
                        {
                          label: "Encryption",
                          status: "Active",
                          color: "bg-green-500",
                        },
                        {
                          label: "Firewall",
                          status: "Protected",
                          color: "bg-green-500",
                        },
                        {
                          label: "Data Access",
                          status: "Restricted",
                          color: "bg-green-500",
                        },
                        {
                          label: "Backup Status",
                          status: "Up-to-date",
                          color: "bg-green-500",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex flex-col space-y-2 bg-background/50 p-4 rounded-xl"
                        >
                          <span className="text-sm text-muted-foreground">
                            {item.label}
                          </span>
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${item.color}`}
                            ></span>
                            <span className="font-medium">{item.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 bg-muted/60 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          Security Score
                        </span>
                        <span className="text-sm font-medium">95/100</span>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          whileInView={{ width: "95%" }}
                          transition={{ duration: 1.5, delay: 0.2 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
                Enterprise-Grade Security
              </span>
              <h2 className="text-3xl font-bold mb-6">
                We take security{" "}
                <span className="gradient-text">seriously</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our platform is built from the ground up with security as the
                primary focus. Every component, from authentication to storage,
                is designed with multiple layers of protection.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "End-to-End Encryption",
                    description:
                      "Your data is encrypted at rest and in transit using industry-standard AES-256 encryption",
                  },
                  {
                    title: "Regular Security Audits",
                    description:
                      "Our systems undergo rigorous third-party security assessments and penetration testing",
                  },
                  {
                    title: "Compliance Ready",
                    description:
                      "Designed to help meet regulatory requirements including GDPR, HIPAA, and SOC 2",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section with Testimonials */}
      <section id="trust" className="py-24 relative z-10">
        <div className="container px-4">
          <motion.div
            ref={trustAnimation.ref}
            initial="hidden"
            animate={trustAnimation.controls}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4"
            >
              Trusted Globally
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">
              What Our Users Say
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground"
            >
              Organizations of all sizes trust Guard to protect their most
              valuable data
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={trustAnimation.controls}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                quote:
                  "Guard transformed how we approach data security. The automated backups give us confidence that our systems are protected.",
                author: "Sarah Johnson",
                role: "CTO, TechCorp",
              },
              {
                quote:
                  "After a server crash, we were able to restore our entire database in minutes. The reliability and speed are impressive.",
                author: "Michael Chen",
                role: "Database Administrator",
              },
              {
                quote:
                  "The peace of mind that comes with knowing our data is safely backed up is invaluable. The interface is both intuitive and powerful.",
                author: "Emma Rodriguez",
                role: "IT Director",
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-border/50 h-full hover:border-primary/20 transition-all">
                  <CardContent className="pt-6">
                    <div className="flex flex-col h-full">
                      <div className="mb-4 text-4xl text-primary/40">"</div>
                      <p className="text-muted-foreground flex-grow">
                        {testimonial.quote}
                      </p>
                      <div className="mt-6">
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30 relative z-10">
        <div className="container px-4">
          <motion.div
            ref={ctaAnimation.ref}
            initial="hidden"
            animate={ctaAnimation.controls}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center space-y-6 bg-card p-12 rounded-3xl border border-border/50 shadow-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">
                Ready to secure your data?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join organizations that trust Guard for their critical data
                protection needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gap-2 group">
                  <Link to="/register">
                    Get Started for Free
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/login">Existing Customer? Login</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/40 relative z-10">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Logo size="sm" />
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Guard. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
