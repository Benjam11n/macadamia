import Hero from '@/components/Hero';
import { FeatureImage } from '@/components/FeatureImage';
import Features from '@/components/Features';

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
