import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Entertainment = () => {
  return (
    <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold">Entertainment</h2>
          </div>
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SportsCard
            image="/placeholder.svg?height=200&width=300"
            title="2023 Formula One season: Drivers who stood out"
          />
          <SportsCard
            image="/placeholder.svg?height=200&width=300"
            title="Indian men's team wins gold in inaugural Asian Half Marathon"
          />
          <SportsCard
            image="/placeholder.svg?height=200&width=300"
            title="Premier League | Everton shows fight after 10-point deduction"
          />
          <SportsCard
            image="/placeholder.svg?height=200&width=300"
            title="Sensational Sinner steers Italy to Davis Cup glory"
          />
          <SportsCard
            image="/placeholder.svg?height=200&width=300"
            title="Chennai Grand Masters Chess Championship from Dec. 15"
          />
          <SportsCard
            image="/placeholder.svg?height=200&width=300"
            title="Tiger Woods' comeback at the Hero World Challenge"
          />
        </div>
      </section>
  );
};

const SportsCard = ({ image, title }: { image: string; title: string }) => (
  <Card className="overflow-hidden">
    <CardContent className="p-0">
      <div className="relative aspect-video">
        <Image src={image} alt={title} layout="fill" className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold line-clamp-2">{title}</h3>
      </div>
    </CardContent>
  </Card>
);

export default  Entertainment;