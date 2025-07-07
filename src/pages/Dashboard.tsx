import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Building, Goal, User, RotateCw } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  goal: string;
  industry: string;
  targetCompanies: string[];
  contactsReached: number;
  createdAt: string;
  status: 'draft' | 'sent' | 'completed';
}

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    // Load campaigns from localStorage (in a real app, this would be from an API)
    const savedCampaigns = localStorage.getItem('firsthello_campaigns');
    if (savedCampaigns) {
      setCampaigns(JSON.parse(savedCampaigns));
    } else {
      // Mock data for demonstration
      const mockCampaigns: Campaign[] = [
        {
          id: "1",
          name: "End Animal Testing Campaign",
          goal: "Convince cosmetics companies to eliminate animal testing and adopt cruelty-free alternatives",
          industry: "Cosmetics & Beauty",
          targetCompanies: ["L'Oréal", "Unilever", "Procter & Gamble"],
          contactsReached: 8,
          createdAt: "2024-01-15",
          status: "completed"
        },
        {
          id: "2", 
          name: "Sustainable Fashion Initiative",
          goal: "Promote animal-friendly materials and ethical sourcing in fashion industry",
          industry: "Fashion & Retail",
          targetCompanies: ["H&M", "Zara", "Nike"],
          contactsReached: 5,
          createdAt: "2024-01-10",
          status: "sent"
        }
      ];
      setCampaigns(mockCampaigns);
      localStorage.setItem('firsthello_campaigns', JSON.stringify(mockCampaigns));
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-gradient-success';
      case 'sent': return 'bg-gradient-secondary';
      case 'draft': return 'bg-gradient-primary';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'sent': return 'Emails Sent';
      case 'draft': return 'Draft';
      default: return 'Unknown';
    }
  };

  const handleDuplicate = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      // In a real app, this would navigate to campaign setup with pre-filled data
      console.log("Duplicating campaign:", campaign);
    }
  };

  const handleViewEmails = (campaignId: string) => {
    console.log("Viewing emails for campaign:", campaignId);
    // In a real app, this would show the generated emails
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl font-bold mb-2">Campaign Dashboard</h1>
              <p className="text-xl text-muted-foreground">
                Manage your animal welfare outreach campaigns
              </p>
            </div>
            <Link to="/campaign-setup">
              <Button variant="hero" size="lg">
                Create New Campaign
              </Button>
            </Link>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {campaigns.length}
                </div>
                <p className="text-sm text-muted-foreground">Total Campaigns</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-secondary mb-2">
                  {campaigns.reduce((sum, c) => sum + c.contactsReached, 0)}
                </div>
                <p className="text-sm text-muted-foreground">Contacts Reached</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-accent mb-2">
                  {campaigns.filter(c => c.status === 'completed').length}
                </div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {new Set(campaigns.flatMap(c => c.targetCompanies)).size}
                </div>
                <p className="text-sm text-muted-foreground">Unique Companies</p>
              </CardContent>
            </Card>
          </div>

          {/* Campaigns List */}
          {campaigns.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Goal className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">No Campaigns Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first campaign to start making an impact for animal welfare.
                </p>
                <Link to="/campaign-setup">
                  <Button variant="hero">
                    Create Your First Campaign
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Your Campaigns</h2>
              
              <div className="grid gap-6">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id} className="hover:shadow-medium transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <CardTitle className="text-xl">{campaign.name}</CardTitle>
                            <Badge 
                              className={`text-white ${getStatusColor(campaign.status)}`}
                            >
                              {getStatusText(campaign.status)}
                            </Badge>
                          </div>
                          <CardDescription className="text-base">
                            {campaign.goal}
                          </CardDescription>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          Created: {new Date(campaign.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div className="flex items-center space-x-3">
                          <Building className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">Industry</p>
                            <p className="text-sm text-muted-foreground">{campaign.industry}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">Contacts Reached</p>
                            <p className="text-sm text-muted-foreground">{campaign.contactsReached} people</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Goal className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">Target Companies</p>
                            <p className="text-sm text-muted-foreground">{campaign.targetCompanies.length} companies</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Target Companies:</p>
                        <div className="flex flex-wrap gap-2">
                          {campaign.targetCompanies.map((company) => (
                            <Badge key={company} variant="secondary">
                              {company}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewEmails(campaign.id)}
                        >
                          View Emails
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDuplicate(campaign.id)}
                        >
                          <RotateCw className="w-4 h-4 mr-2" />
                          Duplicate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;