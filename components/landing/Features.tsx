import { Badge } from '@/components/ui/badge';
import { FEATURES } from '@/constants';
import { Brain, Zap, CheckCircle, Star } from 'lucide-react';

function Features() {
  return (
    <div className="w-full py-20 lg:py-32">
      <div className="container mx-auto">
        <div className="mb-12 text-left">
          <Badge className="mb-4">Interviews Are Hard</Badge>
          <h2 className="mb-4 text-4xl font-semibold md:text-5xl">
            Boost your interview skills
          </h2>
          <p className="max-w-2xl text-xl text-muted-foreground">
            Macadamia improves your interview preparation process and transforms
            your job search strategy for you.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Main feature - Value Proposition Section */}
          <div className="glass-panel feature-card-hover overflow-hidden rounded-xl p-8 shadow-lg">
            <h3 className="mb-4 text-2xl font-semibold md:text-3xl">
              Elevate Your Interview Game
            </h3>
            <p className="mb-8 text-lg text-muted-foreground">
              Our platform helps you practice, refine, and master your interview
              skills with personalized feedback and continuous improvement
              tracking.
            </p>

            {/* Value metrics */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <CheckCircle className="size-6 text-primary" />
                  <span className="text-base font-medium md:text-lg">
                    Success Rate
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold md:text-4xl">94%</span>
                  <span className="text-muted-foreground">
                    of users report improved confidence
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <CheckCircle className="size-6 text-primary" />
                  <span className="text-base font-medium md:text-lg">
                    Feedback Quality
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="size-6 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">rated by users</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <CheckCircle className="size-6 text-primary" />
                  <span className="text-base font-medium md:text-lg">
                    Time Saved
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold md:text-4xl">68%</span>
                  <span className="text-muted-foreground">
                    less prep time needed
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Original features */}
            {FEATURES.map((feature, index) => (
              <div
                key={index}
                className="glass-panel feature-card-hover rounded-xl p-6 shadow-lg"
              >
                <div className="mb-2 aspect-video rounded-md bg-muted"></div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <feature.icon className="size-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold md:text-2xl">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-base text-muted-foreground md:text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Middle row - split into columns */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Lightning Fast */}
            <div className="glass-panel feature-card-hover rounded-xl p-6 shadow-lg">
              <div className="mb-4 flex items-center gap-2">
                <Zap className="size-7 text-primary" />
                <h3 className="text-xl font-semibold md:text-2xl">
                  Lightning Fast
                </h3>
              </div>
              <p className="text-base text-muted-foreground md:text-lg">
                Leading times optimized for seamless experience for your needs.
                Get feedback in seconds, not minutes.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="relative size-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-full animate-pulse rounded-full bg-primary/20"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap size={48} className="text-primary" />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Updates */}
            <div className="glass-panel feature-card-hover rounded-xl p-6 shadow-lg">
              <div className="mb-4 flex items-center gap-2">
                <Brain className="size-7 text-primary" />
                <h3 className="text-xl font-semibold md:text-2xl">
                  AI Updates
                </h3>
              </div>
              <p className="mb-4 text-base text-muted-foreground md:text-lg">
                Our AI models are constantly improving based on the latest
                research and feedback from users.
              </p>

              {/* Updates list */}
              <div className="space-y-3">
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="flex items-start gap-2">
                    <div className="mt-1 size-2 shrink-0 rounded-full bg-green-500"></div>
                    <p className="text-sm md:text-base">
                      Interview success rate has increased by 30% after
                      launching the new practice flow.
                    </p>
                  </div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="flex items-start gap-2">
                    <div className="mt-1 size-2 shrink-0 rounded-full bg-green-500"></div>
                    <p className="text-sm md:text-base">
                      Feature usage has doubled after making it more accessible
                      from the dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
