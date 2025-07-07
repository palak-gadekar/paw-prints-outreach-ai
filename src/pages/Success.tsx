import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Success = () => {
  const navigate = useNavigate();
  const [campaignResults, setCampaignResults] = useState<any>(null);

  useEffect(() => {
    const results = sessionStorage.getItem('campaignResults');
    if (!results) {
      navigate('/');
      return;
    }
    setCampaignResults(JSON.parse(results));
  }, [navigate]);

  const handleGoToGmail = () => {
    window.open('https://mail.google.com/mail/u/0/#drafts', '_blank');
  };

  const handleViewSummary = () => {
    navigate('/dashboard');
  };

  if (!campaignResults) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Success message */}
          <div className="mb-12">
            <div className="w-24 h-24 bg-gradient-success rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-6">
              🎉
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Your Personalized Emails Are Ready!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {campaignResults.emails?.length} tailored emails have been prepared for your animal welfare campaign
            </p>
          </div>

          {/* Campaign summary */}
          <Card className="text-left mb-12 shadow-medium">
            <CardHeader>
              <CardTitle>Campaign Summary</CardTitle>
              <CardDescription>Here's what we accomplished</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Campaign Goal</h4>
                  <p className="text-sm text-muted-foreground">{campaignResults.campaignData?.goal}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Industry Focus</h4>
                  <p className="text-sm text-muted-foreground">{campaignResults.campaignData?.industry}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Target Companies</h4>
                  <p className="text-sm text-muted-foreground">
                    {campaignResults.campaignData?.targetCompanies?.join(', ')}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Contacts Found</h4>
                  <p className="text-sm text-muted-foreground">
                    {campaignResults.contacts?.length} decision-makers identified
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next steps */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">What's Next?</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center p-6 hover:shadow-medium transition-all duration-300">
                <CardContent className="pt-0">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    📧
                  </div>
                  <h3 className="font-semibold mb-2">Review & Send</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your draft emails are saved in Gmail. Review and send when ready.
                  </p>
                  <Button onClick={handleGoToGmail} variant="secondary" size="sm">
                    Go to Gmail
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-medium transition-all duration-300">
                <CardContent className="pt-0">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    🚀
                  </div>
                  <h3 className="font-semibold mb-2">Start New Campaign</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ready to reach more companies? Create another campaign.
                  </p>
                  <Link to="/campaign-setup">
                    <Button variant="outline" size="sm">
                      New Campaign
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-medium transition-all duration-300">
                <CardContent className="pt-0">
                  <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    📊
                  </div>
                  <h3 className="font-semibold mb-2">View Dashboard</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track all your campaigns and manage your outreach.
                  </p>
                  <Button onClick={handleViewSummary} variant="ghost" size="sm">
                    View Summary
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tips */}
          <Card className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-primary">💡 Pro Tips for Success</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left text-sm">
                <div>
                  <strong>• Follow Up:</strong> Send a polite follow-up 1-2 weeks after your initial email
                </div>
                <div>
                  <strong>• Be Patient:</strong> Corporate decisions take time - persistence pays off
                </div>
                <div>
                  <strong>• Share Evidence:</strong> Include relevant studies or reports when replying
                </div>
                <div>
                  <strong>• Stay Positive:</strong> Focus on solutions and collaboration opportunities
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Success;