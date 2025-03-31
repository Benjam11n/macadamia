import Hero from '@/components/landing/Hero';
import { FeatureImage } from '@/components/landing/FeatureImage';
import Features from '@/components/landing/Features';

export default function Home() {
  return (
    <div>
      <div className="container px-4">
        <div className="mx-auto max-w-7xl">
          <Hero />

          <div className="animate-fadeIn">
            <Features />
            <FeatureImage />
          </div>
        </div>
      </div>
    </div>
  );
}
