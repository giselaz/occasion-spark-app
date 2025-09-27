import  { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, Tag } from 'lucide-react';

interface FormCardProps {
    title:string;
    description:string;
    children: ReactNode;
}
function FormCard({title,description,children}:FormCardProps) {
  return (
    <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Tag className="h-5 w-5" />
                  <span>{title}</span>
                </CardTitle>
                <CardDescription>
                  {description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {children}
              </CardContent>
            </Card>

  )
}

export default FormCard
