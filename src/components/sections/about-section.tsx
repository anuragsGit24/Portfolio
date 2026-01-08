import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Code, Rocket } from 'lucide-react';
import { SectionWrapper } from './section-wrapper';

const profileImage = PlaceHolderImages.find(p => p.id === 'profile-picture');

const philosophies = [
  {
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    title: 'User-Centric Design',
    description: "I believe the best products are built with the user's needs at their core. Empathy is my most powerful tool.",
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: 'Clean & Scalable Code',
    description: 'I write code that is not just functional, but also maintainable and easy for others to understand and build upon.',
  },
  {
    icon: <Rocket className="w-8 h-8 text-primary" />,
    title: 'Continuous Learning',
    description: 'The tech landscape is always evolving. I am committed to perpetual learning to stay at the forefront of innovation.',
  },
];

export function AboutSection() {
  return (
    <SectionWrapper id="about" >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="lg:col-span-1 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl group">
             {profileImage && (
                <Image
                  src={profileImage.imageUrl}
                  alt={profileImage.description}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  data-ai-hint={profileImage}
                />
              )}
            <div className="absolute inset-0 bg-primary/20 rounded-full"></div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Hello! I'm Anurag, a passionate software developer with a knack for creating elegant solutions in the digital space. My journey in tech started with a fascination for how a few lines of code could bring ideas to life. Today, I specialize in full-stack development, with a strong focus on modern frontend technologies.
          </p>
          <p className="text-lg text-muted-foreground">
            When I'm not coding, you can find me exploring new hiking trails, experimenting with new recipes in the kitchen, or diving into a good sci-fi movies.
          </p>
        </div>
      </div>
      <div className="mt-20">
        <h3 className="text-2xl md:text-3xl font-bold font-headline text-center mb-12">My Philosophy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophies.map((item) => (
            <Card key={item.title} className="text-center bg-card/50 hover:bg-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h4 className="text-xl font-semibold font-headline mb-2">{item.title}</h4>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
