import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { User, MapPin, Goal, Building } from "lucide-react";

const CampaignSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    goal: "",
    industry: "",
    targetCompanies: [] as string[]
  });

  const [newCompany, setNewCompany] = useState("");

  const industries = [
    "Fashion & Retail",
    "Food & Beverage", 
    "Cosmetics & Beauty",
    "Technology",
    "Entertainment",
    "Hospitality",
    "Manufacturing",
    "Automotive"
  ];

  const addCompany = () => {
    if (newCompany.trim() && !formData.targetCompanies.includes(newCompany.trim())) {
      setFormData({
        ...formData,
        targetCompanies: [...formData.targetCompanies, newCompany.trim()]
      });
      setNewCompany("");
    }
  };

  const removeCompany = (company: string) => {
    setFormData({
      ...formData,
      targetCompanies: formData.targetCompanies.filter(c => c !== company)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data and navigate to AI process
    sessionStorage.setItem('campaignData', JSON.stringify(formData));
    navigate('/ai-process');
  };

  const canProceed = formData.name && formData.location && formData.goal && 
                    formData.industry && formData.targetCompanies.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Progress indicator */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <span className="ml-2 text-sm font-medium text-primary">Campaign Setup</span>
            </div>
            <div className="flex-1 h-px bg-border"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-sm">2</div>
              <span className="ml-2 text-sm text-muted-foreground">AI Generation</span>
            </div>
            <div className="flex-1 h-px bg-border"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-sm">3</div>
              <span className="ml-2 text-sm text-muted-foreground">Review & Send</span>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-2xl">Set Up Your Campaign</CardTitle>
              <CardDescription>
                Tell us about your mission and we'll help you create impactful outreach
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-primary" />
                    <span>Your Name</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Location</span>
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="City, State/Country"
                    required
                  />
                </div>

                {/* Campaign Goal */}
                <div className="space-y-2">
                  <Label htmlFor="goal" className="flex items-center space-x-2">
                    <Goal className="w-4 h-4 text-primary" />
                    <span>Campaign Goal</span>
                  </Label>
                  <Textarea
                    id="goal"
                    value={formData.goal}
                    onChange={(e) => setFormData({...formData, goal: e.target.value})}
                    placeholder="Describe what you want to achieve (e.g., end animal testing, improve farm animal welfare, stop using fur)"
                    rows={4}
                    required
                  />
                </div>

                {/* Industry */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-primary" />
                    <span>Industry Focus</span>
                  </Label>
                  <Select 
                    value={formData.industry} 
                    onValueChange={(value) => setFormData({...formData, industry: value})}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select target industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Target Companies */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-primary" />
                    <span>Target Companies</span>
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      value={newCompany}
                      onChange={(e) => setNewCompany(e.target.value)}
                      placeholder="Add company name"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCompany())}
                    />
                    <Button type="button" onClick={addCompany} variant="outline">
                      Add
                    </Button>
                  </div>
                  
                  {formData.targetCompanies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.targetCompanies.map((company) => (
                        <Badge 
                          key={company} 
                          variant="secondary" 
                          className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => removeCompany(company)}
                        >
                          {company} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Add companies you want to target. Click on a company to remove it.
                  </p>
                </div>

                {/* Submit */}
                <div className="flex justify-between pt-6">
                  <Link to="/">
                    <Button variant="ghost">
                      Back to Home
                    </Button>
                  </Link>
                  <Button 
                    type="submit" 
                    disabled={!canProceed}
                    variant={canProceed ? "default" : "outline"}
                  >
                    Generate Campaign
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CampaignSetup;