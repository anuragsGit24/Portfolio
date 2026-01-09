import { TESTIMONIALS } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { SectionWrapper } from './section-wrapper';

export function TestimonialsSection() {
  return (
    <SectionWrapper id="testimonials">
      <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">Kind Words From Colleagues</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full max-w-4xl mx-auto"
        aria-label="Testimonials carousel"
      >
        <CarouselContent>
          {TESTIMONIALS.map((testimonial, index) => {
             const image = PlaceHolderImages.find(p => p.id === testimonial.imagePlaceholder);
            return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                    <Card className="flex flex-col h-full">
                        <CardContent className="flex flex-col items-center text-center p-6 flex-grow">
                        {image && (
                            <Image
                                src={image.imageUrl}
                                alt={testimonial.name}
                                width={80}
                                height={80}
                                className="rounded-full mb-4 border-2 border-primary/50"
                                data-ai-hint={image.imageHint}
                            />
                        )}
                        <p className="text-lg font-medium italic mb-4">"{testimonial.quote}"</p>
                        <div className="mt-auto">
                            <p className="font-bold font-headline">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                        </CardContent>
                    </Card>
                    </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </SectionWrapper>
  );
}
