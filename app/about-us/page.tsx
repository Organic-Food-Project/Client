import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'About Us - Organic Food',
  description:
    'Learn about Organic Food mission to deliver organic and healthy food products',
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <div className="py-12 px-4">
        <div>
          <h1 className="text-4xl font-extrabold text-foreground mb-3 tracking-tight">
            About Organic Food
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Bringing fresh, organic produce directly to your doorstep
          </p>
        </div>
      </div>

      <div className="px-4 py-12">
        {/* Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-5 tracking-tight text-foreground">
            Our Mission
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Organic Food is committed to revolutionizing the way people access
            fresh, organic, and healthy food products. Our mission is to bridge
            the gap between local farmers and conscious consumers, ensuring that
            every family has access to pesticide-free, sustainably grown
            produce.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We believe that healthy eating should be accessible to everyone, and
            we work tirelessly to make it a reality by supporting local organic
            farmers and promoting sustainable agriculture practices.
          </p>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 tracking-tight text-foreground">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Quality First',
                desc: 'We source only the finest organic produce from certified farms, ensuring every product meets our strict quality standards.',
              },
              {
                title: 'Sustainability',
                desc: "We're committed to environmental stewardship through eco-friendly packaging and supporting regenerative agriculture.",
              },
              {
                title: 'Farmer Support',
                desc: 'We ensure fair prices and direct partnerships with local farmers, helping them thrive and grow sustainably.',
              },
              {
                title: 'Customer Care',
                desc: 'Your satisfaction is our priority. We provide exceptional customer service and stand behind every product we deliver.',
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="hover:shadow-md transition-shadow border border-muted/30 bg-white/60 backdrop-blur-sm"
              >
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <CheckCircle className="h-7 w-7 text-green-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2 text-lg tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose */}
        <section>
          <h2 className="text-3xl font-bold mb-6 tracking-tight text-foreground">
            Why Choose Organic Food?
          </h2>
          <ul className="space-y-4 text-muted-foreground leading-relaxed">
            {[
              '100% organic certified produce from trusted local farmers',
              'Farm-to-table freshness with guaranteed delivery within 24 hours',
              'Competitive pricing without sacrificing quality',
              "Eco-friendly packaging that's 100% recyclable",
              'Wide variety of organic fruits, vegetables, and healthy food products',
              'Nutritional information and farming practices transparency',
            ].map((point, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
