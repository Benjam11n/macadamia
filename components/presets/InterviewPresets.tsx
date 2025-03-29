import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, X } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { InterviewerPresetSchema } from '@/lib/validations';
import { Preset } from '@prisma/client';
import { toast } from 'sonner';
import { createPreset } from '@/lib/actions/preset.action';

export type PresetType = z.infer<typeof InterviewerPresetSchema>;
const CustomPresetSchema = InterviewerPresetSchema.omit({ id: true });

interface InterviewPresetsProps {
  value?: string;
  onChange: (value: PresetType) => void;
  presets?: Preset[];
}

export function InterviewPresets({
  value,
  onChange,
  presets,
}: InterviewPresetsProps) {
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const customForm = useForm<z.infer<typeof CustomPresetSchema>>({
    resolver: zodResolver(CustomPresetSchema),
    defaultValues: {
      name: '',
      description: '',
      personality: '',
    },
  });

  const handlePresetSelect = (presetId: string) => {
    const selectedPreset = presets?.find((p) => p.id === presetId);
    if (selectedPreset) {
      onChange(selectedPreset);
    }
  };

  const onCustomPresetSubmit = async (
    data: z.infer<typeof CustomPresetSchema>
  ) => {
    try {
      setIsSubmitting(true);

      const response = await createPreset({
        name: data.name,
        description: data.description,
        personality: data.personality,
      });

      if (response.success && response.data) {
        onChange(response.data);

        toast('Success', {
          description: 'Custom preset created successfully',
        });

        customForm.reset();
        setIsCreatingCustom(false);
      } else {
        toast.error('Error', {
          description: response.error?.message || 'Failed to create preset',
        });
      }
    } catch (error) {
      console.error('Error creating preset:', error);
      toast.error('Error', {
        description: 'An unexpected error occurred',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPreset = presets?.find((p) => p.id === value);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Select value={value} onValueChange={handlePresetSelect}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select a personality preset" />
          </SelectTrigger>
          <SelectContent>
            {presets?.map((preset) => (
              <SelectItem
                key={preset.id}
                value={preset.id}
                className="flex flex-col items-start gap-1 py-3"
              >
                <div className="font-medium">{preset.name}</div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedPreset && (
          <p className="text-sm text-muted-foreground">
            {selectedPreset.description}
          </p>
        )}
      </div>

      {!isCreatingCustom ? (
        <Button
          type="button"
          variant="outline"
          className="h-12 w-full"
          onClick={() => setIsCreatingCustom(true)}
        >
          <Plus className="mr-2 size-4" />
          Create Custom Preset
        </Button>
      ) : (
        <div className="rounded-lg border p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Create Custom Preset</h3>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsCreatingCustom(false)}
            >
              <X className="size-4" />
            </Button>
          </div>
          <Form {...customForm}>
            <div className="space-y-4">
              <FormField
                control={customForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preset Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Professional Mentor"
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={customForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Brief description of the interviewer's style"
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={customForm.control}
                name="personality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personality Instructions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed instructions for how the interviewer should behave..."
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  className="h-12"
                  onClick={customForm.handleSubmit(onCustomPresetSubmit)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Preset'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12"
                  onClick={() => setIsCreatingCustom(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
