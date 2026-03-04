import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"


import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const DeleteDrawer = ({info}) => {
  return (
<Drawer>
    <DrawerTrigger asChild>
        <Button className="flex-1" variant="destructive">
          Delete
        </Button>
      </DrawerTrigger>
  <DrawerContent className="h-[75vh] w-full flex flex-col items-center">
    <DrawerHeader>
      <DrawerTitle className="text-center">Delete this book?</DrawerTitle>
    </DrawerHeader>
    <div className="w-full flex flex-col items-center overflow-y-auto px-4 py-2 ">
    <Textarea className="text-md sm:max-w[80vw] md:max-w[70vw] lg:max-w-[50vw]" placeholder="Why are you dropping this book?" rows={10} />
    </div>
    <DrawerFooter>
        <div className='flex gap-2'>
      <Button>Submit</Button>
        <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
        </DrawerClose>
        </div>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
  
  )
}

export default DeleteDrawer