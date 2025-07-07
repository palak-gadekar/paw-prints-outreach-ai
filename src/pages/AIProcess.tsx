import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { RotateCw, Save, User } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  linkedinTitle: string;
}

interface EmailPreview {
  id: string;
  contactId: string;
  subject: string;
  snippet: string;
  fullContent: string;
}

const AIProcess = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [emails, setEmails] = useState<EmailPreview[]>([]);
  const [campaignData, setCampaignData] = useState<any>(null);

  useEffect(() => {
    // Get campaign data from session storage
    const data = sessionStorage.getItem('campaignData');
    if (!data) {
      navigate('/campaign-setup');
      return;
    }
    setCampaignData(JSON.parse(data));

    // Simulate AI processing
    setTimeout(() => {
      // Mock contacts data
      const mockContacts: Contact[] = [
        {
          id: "1",
          name: "Sarah Johnson",
          role: "Head of Corporate Social Responsibility",
          company: campaignData?.targetCompanies[0] || "Target Company",
          linkedinTitle: "Leading sustainable initiatives and ethical practices"
        },
        {
          id: "2", 
          name: "Michael Chen",
          role: "Director of Marketing",
          company: campaignData?.targetCompanies[0] || "Target Company",
          linkedinTitle: "Building brand stories that matter"
        },
        {
          id: "3",
          name: "Emily Rodriguez",
          role: "VP of Operations",
          company: campaignData?.targetCompanies[1] || "Second Company",
          linkedinTitle: "Optimizing business processes with ethical focus"
        }
      ];

      // Mock email previews
      const mockEmails: EmailPreview[] = [
        {
          id: "e1",
          contactId: "1",
          subject: `Partnership Opportunity: Advancing Animal Welfare in ${campaignData?.industry}`,
          snippet: "Hi Sarah, I hope this message finds you well. As someone leading CSR initiatives at your company, I wanted to reach out about an important opportunity...",
          fullContent: `Subject: Partnership Opportunity: Advancing Animal Welfare in ${campaignData?.industry}

Hi Sarah,

I hope this message finds you well. As someone leading CSR initiatives at ${campaignData?.targetCompanies[0]}, I wanted to reach out about an important opportunity to enhance your company's ethical impact.

My name is ${campaignData?.name}, and I'm an animal welfare advocate based in ${campaignData?.location}. I've been following your company's sustainability efforts, and I'm impressed by your commitment to responsible business practices.

I'd love to discuss how ${campaignData?.targetCompanies[0]} could take a leadership role in ${campaignData?.goal}. This aligns perfectly with current consumer expectations and could significantly strengthen your brand's ethical positioning.

Would you have 15 minutes for a brief call to explore this opportunity?

Best regards,
${campaignData?.name}`
        },
        {
          id: "e2",
          contactId: "2", 
          subject: "Brand Differentiation Through Animal Welfare Leadership",
          snippet: "Hi Michael, I'm reaching out because I believe there's a significant marketing opportunity that aligns with your brand storytelling expertise...",
          fullContent: `Subject: Brand Differentiation Through Animal Welfare Leadership

Hi Michael,

I'm reaching out because I believe there's a significant marketing opportunity that aligns with your brand storytelling expertise at ${campaignData?.targetCompanies[0]}.

My name is ${campaignData?.name}, and I'm passionate about ${campaignData?.goal}. As someone who builds brand stories that matter, you understand the power of authentic values-driven messaging.

The animal welfare space presents an untapped opportunity for ${campaignData?.targetCompanies[0]} to differentiate itself in the ${campaignData?.industry} market while creating genuine positive impact.

I'd love to share some insights about how this could enhance your current marketing strategy. Would you be open to a brief conversation?

Best regards,
${campaignData?.name}`
        },
        {
          id: "e3",
          contactId: "3",
          subject: "Operational Excellence Through Ethical Sourcing",
          snippet: "Hi Emily, I wanted to connect with you about optimizing operations while advancing animal welfare standards...",
          fullContent: `Subject: Operational Excellence Through Ethical Sourcing

Hi Emily,

I wanted to connect with you about optimizing operations while advancing animal welfare standards - an area where operational efficiency and ethical practices can powerfully align.

My name is ${campaignData?.name}, based in ${campaignData?.location}. I've been researching how companies like ${campaignData?.targetCompanies[1]} can achieve operational excellence while implementing higher welfare standards.

Given your focus on ethical business processes, I believe you'd be interested in discussing how ${campaignData?.goal} could be integrated into your operational framework in ways that actually improve efficiency and reduce risks.

Would you have time for a brief call to explore this further?

Best regards,
${campaignData?.name}`
        }
      ];

      setContacts(mockContacts);
      setEmails(mockEmails);
      setIsLoading(false);
    }, 3000);
  }, [navigate]);

  const handleRegenerateEmail = (emailId: string) => {
    console.log("Regenerating email:", emailId);
    // In a real app, this would trigger AI regeneration
  };

  const handleSaveEmail = (emailId: string) => {
    console.log("Saving email to Gmail:", emailId);
    // In a real app, this would save to Gmail drafts
  };

  const handleFinish = () => {
    // Store results and navigate to success page
    const results = {
      campaignData,
      contacts,
      emails,
      generatedAt: new Date().toISOString()
    };
    sessionStorage.setItem('campaignResults', JSON.stringify(results));
    navigate('/success');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <RotateCw className="w-12 h-12 text-white animate-spin" />
              </div>
              <h1 className="text-3xl font-bold mb-4">AI is Working Its Magic</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Finding the perfect contacts and crafting personalized emails for your campaign...
              </p>
              <div className="space-y-2 text-left bg-muted p-6 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm">Analyzing target companies...</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse animation-delay-1000"></div>
                  <span className="text-sm">Finding decision-makers...</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse animation-delay-2000"></div>
                  <span className="text-sm">Generating personalized content...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Progress indicator */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm">✓</div>
              <span className="ml-2 text-sm text-muted-foreground">Campaign Setup</span>
            </div>
            <div className="flex-1 h-px bg-primary"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
              <span className="ml-2 text-sm font-medium text-primary">AI Generation - Complete!</span>
            </div>
            <div className="flex-1 h-px bg-border"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-sm">3</div>
              <span className="ml-2 text-sm text-muted-foreground">Review & Send</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">🎉 Your Campaign is Ready!</h1>
            <p className="text-xl text-muted-foreground">
              Found {contacts.length} contacts and generated {emails.length} personalized emails
            </p>
          </div>

          {/* Contacts Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Contact Cards</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((contact) => (
                <Card key={contact.id} className="hover:shadow-medium transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{contact.name}</h3>
                        <p className="text-sm text-primary font-medium">{contact.role}</p>
                        <p className="text-sm text-muted-foreground mb-2">{contact.company}</p>
                        <Badge variant="secondary" className="text-xs">
                          {contact.linkedinTitle}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Email Previews Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Email Previews</h2>
            <div className="space-y-6">
              {emails.map((email) => {
                const contact = contacts.find(c => c.id === email.contactId);
                return (
                  <Card key={email.id} className="hover:shadow-medium transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{contact?.name}</CardTitle>
                          <CardDescription>{contact?.company} • {contact?.role}</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRegenerateEmail(email.id)}
                          >
                            <RotateCw className="w-4 h-4 mr-2" />
                            Regenerate
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleSaveEmail(email.id)}
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save to Gmail
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <strong className="text-sm">Subject:</strong>
                          <p className="text-sm font-medium">{email.subject}</p>
                        </div>
                        <div>
                          <strong className="text-sm">Preview:</strong>
                          <p className="text-sm text-muted-foreground">{email.snippet}</p>
                        </div>
                        <details className="mt-4">
                          <summary className="cursor-pointer text-sm font-medium text-primary hover:underline">
                            View Full Email
                          </summary>
                          <div className="mt-3 p-4 bg-muted rounded-lg">
                            <pre className="whitespace-pre-wrap text-sm">{email.fullContent}</pre>
                          </div>
                        </details>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="text-center">
            <Button onClick={handleFinish} variant="hero" size="lg">
              All Emails Look Great - Finish Campaign
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIProcess;