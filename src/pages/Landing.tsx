import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-illustration.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Hero illustration */}
            <div className="order-2 lg:order-1">
              <img 
                src={heroImage} 
                alt="Animal welfare activism powered by AI" 
                className="w-full h-auto rounded-lg shadow-medium"
              />
            </div>
            
            {/* Right side - Hero content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  AI-Powered
                </span>
                <br />
                Cold Outreach for
                <br />
                <span className="text-primary">Animal Welfare</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Generate personalized emails to corporate decision-makers and amplify your voice for animals. Find contacts, craft compelling messages, and save drafts directly to Gmail.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/campaign-setup">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    Start Campaign
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="xl" 
                  className="w-full sm:w-auto"
                  onClick={() => {
                    document.querySelector('#how-it-works')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How FirstHello Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three simple steps to create powerful, personalized outreach campaigns
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-medium transition-all duration-300">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4">Set Your Campaign</h3>
                <p className="text-muted-foreground">
                  Define your goal, target companies, and campaign focus. Our AI understands your mission.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-medium transition-all duration-300">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4">AI Finds & Crafts</h3>
                <p className="text-muted-foreground">
                  We find the right contacts and generate personalized, compelling emails tailored to each recipient.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-medium transition-all duration-300">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4">Review & Send</h3>
                <p className="text-muted-foreground">
                  Edit drafts, save to Gmail, and send when you're ready. Full control, maximum impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Amplify Your Voice for Animals?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join activists worldwide using AI to create meaningful corporate change.
          </p>
          <Link to="/campaign-setup">
            <Button variant="secondary" size="xl">
              Start Your First Campaign
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;