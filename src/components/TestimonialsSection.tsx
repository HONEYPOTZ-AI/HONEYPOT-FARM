import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  company_name: string;
  customer_name: string;
  position: string;
  testimonial_text: string;
  rating: number;
  company_logo: string;
  is_featured: boolean;
  case_study_title: string;
  case_study_summary: string;
}

const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await window.ezsite.apis.tablePage(33676, {
          "PageNo": 1,
          "PageSize": 20,
          "OrderByField": "id",
          "IsAsc": false,
          "Filters": []
        });

        if (error) throw error;

        const testimonialList = data?.List || [];
        setTestimonials(testimonialList);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Add some mock data for demonstration
        setTestimonials([
          {
            id: 1,
            company_name: "CyberTech Solutions",
            customer_name: "Sarah Johnson",
            position: "CISO",
            testimonial_text: "HoneyPot Farm has revolutionized our threat detection capabilities. We've identified and mitigated over 200 potential breaches in just the first month.",
            rating: 5,
            company_logo: "",
            is_featured: true,
            case_study_title: "Preventing APT Attacks",
            case_study_summary: "How CyberTech Solutions used HoneyPot Farm to detect and prevent advanced persistent threats."
          },
          {
            id: 2,
            company_name: "SecureBank International",
            customer_name: "Michael Chen",
            position: "Head of Security",
            testimonial_text: "The real-time threat intelligence and scalable infrastructure have made our security operations much more efficient and effective.",
            rating: 5,
            company_logo: "",
            is_featured: true,
            case_study_title: "Banking Security Enhancement",
            case_study_summary: "Implementing enterprise-grade deception technology across multiple data centers."
          },
          {
            id: 3,
            company_name: "DataGuard Corp",
            customer_name: "Emily Rodriguez",
            position: "Security Analyst",
            testimonial_text: "The intuitive dashboard and comprehensive reporting have simplified our threat analysis workflow significantly.",
            rating: 4,
            company_logo: "",
            is_featured: false,
            case_study_title: "Streamlined Operations",
            case_study_summary: "Reducing incident response time by 60% with automated threat detection."
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(nextTestimonial, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-600 rounded w-1/3 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="bg-slate-800/50 border-cyan-500/30">
                <CardContent className="p-8">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                    <div className="h-20 bg-gray-600 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            What Our Customers Say
          </h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Trusted by security professionals worldwide to protect critical infrastructure
          </p>
        </motion.div>

        {/* Featured Testimonial Carousel */}
        <div className="relative mb-16">
          <AnimatePresence mode="wait">
            {testimonials.length > 0 && (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/30 backdrop-blur-sm">
                  <CardContent className="p-12 text-center">
                    <Quote className="w-12 h-12 text-cyan-400 mx-auto mb-6 opacity-50" />
                    <blockquote className="text-2xl font-medium text-gray-100 mb-8 leading-relaxed">
                      "{testimonials[currentIndex]?.testimonial_text}"
                    </blockquote>
                    <div className="flex justify-center mb-4">
                      {renderStars(testimonials[currentIndex]?.rating || 5)}
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-cyan-300">
                          {testimonials[currentIndex]?.customer_name}
                        </p>
                        <p className="text-sm text-gray-400">
                          {testimonials[currentIndex]?.position} at {testimonials[currentIndex]?.company_name}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {testimonials.length > 1 && (
            <div className="absolute top-1/2 left-4 right-4 flex justify-between items-center pointer-events-none">
              <Button
                onClick={prevTestimonial}
                size="sm"
                variant="outline"
                className="pointer-events-auto bg-slate-800/50 border-cyan-500/30 hover:border-cyan-400/50 text-cyan-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                onClick={nextTestimonial}
                size="sm"
                variant="outline"
                className="pointer-events-auto bg-slate-800/50 border-cyan-500/30 hover:border-cyan-400/50 text-cyan-300"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Case Studies Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4 className="text-2xl font-bold text-center mb-8 text-cyan-300">
            Case Studies & Success Stories
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-slate-800/30 border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-cyan-300">
                          {testimonial.company_name}
                        </h5>
                        <div className="flex">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>
                    {testimonial.case_study_title && (
                      <div className="mb-4">
                        <h6 className="font-medium text-orange-300 mb-2">
                          {testimonial.case_study_title}
                        </h6>
                        {testimonial.case_study_summary && (
                          <p className="text-sm text-gray-300">
                            {testimonial.case_study_summary}
                          </p>
                        )}
                      </div>
                    )}
                    <blockquote className="text-sm text-gray-300 italic">
                      "{testimonial.testimonial_text.substring(0, 120)}..."
                    </blockquote>
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <p className="text-xs text-gray-400">
                        {testimonial.customer_name}, {testimonial.position}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;