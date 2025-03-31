'use client';

import { Button } from './ui/button';
import Link from 'next/link';
import { ShinyText } from './ui/shiny-text';
import { ArrowUpRight, Play, CheckCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export default function Hero() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleLoadedData = () => {
        setIsVideoLoaded(true);
      };
      videoElement.addEventListener('loadeddata', handleLoadedData);
      return () => {
        videoElement.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative space-y-4 py-16">
      <div className="absolute -right-24 -top-24 size-96 animate-pulse rounded-full bg-gradient-to-b from-green-100 to-green-300 opacity-40 blur-3xl dark:from-green-400 dark:to-green-600"></div>
      <div className="absolute -left-24 top-48 size-[480px] animate-pulse rounded-full bg-gradient-to-t from-green-100 to-green-300 opacity-30 blur-3xl dark:from-green-400 dark:to-green-600"></div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Text content */}
          <div className="animate-fadeIn flex flex-col gap-8">
            <div>
              <h1 className="text-5xl font-bold text-foreground md:text-6xl lg:text-7xl">
                <ShinyText text="Crack your" disabled={false} speed={3} />
                <br />
                <span className="text-primary">next interview</span>
              </h1>
              <p className="mt-6 text-2xl">
                Practice with our AI interview simulator and get real-time
                feedback to boost your confidence.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <Button
                size="lg"
                className="group relative flex items-center overflow-hidden rounded-full px-8 py-6 text-lg font-medium shadow-lg transition-all duration-300 hover:shadow-xl"
                onClick={() => router.push(ROUTES.DASHBOARD)}
              >
                Start Practising
                <span className="ml-2 flex size-6 items-center justify-center rounded-full transition-transform group-hover:translate-x-1">
                  <ArrowUpRight size={18} />
                </span>
              </Button>

              <Link
                href={ROUTES.ABOUT}
                prefetch
                className="flex items-center px-4 py-2 text-lg font-medium text-green-600 hover:text-green-700"
              >
                Learn more
              </Link>
            </div>

            {/* Feature bullets */}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                'Real-time feedback',
                'Industry-specific questions',
                'Personalized coaching',
                'Performance analytics',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle className="size-5 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Video showcase */}
          <div className="relative">
            <Card className="overflow-hidden rounded-2xl border-0 shadow-2xl">
              <div className="relative aspect-video w-full">
                {!isVideoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="size-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
                  </div>
                )}

                <video
                  ref={videoRef}
                  className={`size-full object-cover transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onLoadedData={() => setIsVideoLoaded(true)}
                >
                  <source src="/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Play button overlay */}
                <div
                  className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100"
                  onClick={toggleVideo}
                >
                  <div className="flex size-20 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm transition-transform hover:scale-110">
                    <Play className="size-10 fill-white text-white" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
