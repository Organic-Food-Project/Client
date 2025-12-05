'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import FarmerImage from '@/assets/FarmerImage.webp';

const faqItems = [
  {
    id: 1,
    question: 'What makes our Organic Food different from traditional markets?',
    answer:
      'Our Organic Food is committed to sustainability and organic practices. We partner exclusively with local farmers who use eco-friendly farming methods. Every product is sourced responsibly, and we eliminate plastic packaging by offering compostable and reusable alternatives. Our mission is to provide fresh, organic produce while supporting local communities and protecting the environment.',
  },
  {
    id: 2,
    question: 'How do you ensure the quality of your products?',
    answer:
      'Quality assurance is at the heart of our operation. Each product undergoes rigorous inspection before reaching our shelves. We work directly with certified organic farms that follow strict agricultural standards. Our suppliers are regularly audited, and we maintain transparent traceability from farm to table. We believe in providing only the best for our customers.',
  },
  {
    id: 3,
    question: 'Do you offer delivery services for online orders?',
    answer:
      'Yes, we offer fast and reliable delivery services. Orders placed before 2 PM are delivered the next day within our service area. We use eco-friendly vehicles for all deliveries to minimize our carbon footprint. Delivery is free for orders over a certain amount, and we provide tracking information for every shipment.',
  },
  {
    id: 4,
    question: 'What certifications do your products have?',
    answer:
      'All our organic products are certified by recognized international bodies. We maintain certifications including organic farming, fair trade, and sustainable agriculture standards. Each product label clearly displays the certifications it holds, and you can scan QR codes on packaging for complete verification details.',
  },
  {
    id: 5,
    question: "Can I return or exchange products if I'm not satisfied?",
    answer:
      "Customer satisfaction is our priority. We offer a 7-day return policy on all products in their original condition. If you receive any damaged or unsatisfactory items, we'll replace them immediately at no cost. Simply contact our customer service team with your order details and photos if necessary.",
  },
];

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center pt-[100px] ">
      {/* Left side - FAQ */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Welcome, Let&apos;s Talk About Our Organic Food
        </h1>
        <p className="text-gray-600 mb-8">
          Discover everything you need to know about our sustainable marketplace
        </p>

        {/* Accordion */}
        <div className="space-y-3">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-green-500 transition-colors"
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === item.id ? null : item.id)
                }
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left cursor-pointer"
              >
                <span className="font-semibold text-gray-900">
                  {item.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-green-600 transition-transform flex-shrink-0 ml-4 ${
                    expandedId === item.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedId === item.id && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:flex justify-center">
        <Image
          width={741}
          height={808}
          src={FarmerImage}
          alt="Farmer with fresh organic produce basket"
          className=""
        />
      </div>
    </div>
  );
}
