import Header from '../components/Header';
import React from "react";
import { CardTitle, CardDescription, CardHeader, CardContent, Card, CardFooter} from "../../public/ContactUi"
import { Label } from "../../public/ContactUi"
import { Input } from "../../public/ContactUi"
import { Textarea } from "../../public/ContactUi"
import { Button } from "../../public/ContactUi"


export default function ContactPage() {
  return (
    <div className=' flex flex-col gap-7 justify-center items-center py-44'>
<div className='flex justify-center'>
  <p className=' text-5xl font-extrabold font-primary'>Contact Us</p>



</div>
    <div className=' '>
   
    <Card className="">
     
      <CardHeader>

        <div className=' font-primary font-semibold'> 
          Have a question or need help? Fill out the form below and we'll get back to you as soon as possible.
        </div> 
      </CardHeader>
      <CardContent className="space-y-4">
        <form className='grid gap-6'>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" type="email" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea className="min-h-[100px]" id="message" placeholder="Enter your message" />
          </div>
          <CardFooter className="flex justify-end">
            <button className='bg-gray-900 px-5 py-3 text-white font-primary rounded-lg' type="submit">Submit</button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
    </div>
    </div>

  )
}
 