'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DefaultValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { useInterviewStore } from '@/store/useInterviewStore';
import { toast } from 'sonner';
import { useState } from 'react';
import { createRole } from '@/lib/actions/role.action';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

// Removed interviewerPreset from the schema
const RoleOnlySchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required'),
  companyName: z.string().min(1, 'Company name is required'),
  jobDescription: z.string().min(1, 'Job description is required'),
});

type FormData = z.infer<typeof RoleOnlySchema>;

const defaultValues: DefaultValues<FormData> = {
  jobTitle: '',
  companyName: '',
  jobDescription: '',
};

export default function RoleForm() {
  const router = useRouter();
  const { setRoleId } = useInterviewStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(RoleOnlySchema),
    defaultValues,
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      const result = await createRole({
        title: data.jobTitle,
        company: data.companyName,
        description: data.jobDescription,
      });

      if (result.error) {
        toast.error(result.error.message);
        return;
      }

      if (result.data) {
        setRoleId(result.data.id);
        toast.success('Role created successfully!');
        router.push(ROUTES.RESUME(result.data.id));
      }
    } catch (error) {
      toast.error('Failed to create role. Please try again.');
      console.error('Role creation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Target Role Details</h1>
          <p className="text-muted-foreground">
            Enter the details of the position you&apos;re interviewing for
          </p>
        </div>

        <Card className="animate-fadeIn">
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Job Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Software Engineer"
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Company Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Acme Corp"
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jobDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Job Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste the job description here..."
                          className="min-h-[120px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-4 pt-4">
                  <Button
                    type="submit"
                    className="h-12 text-base font-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Next'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
