import { Card, CardContent } from '@/components/ui/card'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Phone className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-600 dark:text-gray-400">+91 98765 43210</p>
                <p className="text-gray-600 dark:text-gray-400">+91 87654 32109</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-600 dark:text-gray-400">info@rasslearning.com</p>
                <p className="text-gray-600 dark:text-gray-400">support@rasslearning.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-medium">Head Office</p>
                <p className="text-gray-600 dark:text-gray-400">
                  123, Tech Park, Koramangala<br />
                  Bengaluru, Karnataka 560034
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Clock className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-medium">Office Hours</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
{/* 
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Need Immediate Help?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Our student success team is available to answer your questions
          </p>
          <Button className="w-full bg-primary hover:bg-primary/90">
            Schedule a Call
          </Button>
        </CardContent>
      </Card> */}
    </div>
  )
}