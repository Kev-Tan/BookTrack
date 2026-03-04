import React from 'react'
import { Button } from "@/components/ui/button"

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

const BookDrawer = ({info}) => {
  return (
<Drawer>
    <DrawerTrigger asChild>
        <Button className="flex-1" variant="default">
          View More
        </Button>
      </DrawerTrigger>
  <DrawerContent className="h-[75vh] w-full flex flex-col items-center">
    <DrawerHeader>
      <DrawerTitle className="text-center">{info.title}</DrawerTitle>
      <DrawerDescription className="text-center">{info.author}</DrawerDescription>
    </DrawerHeader>
    <div className="w-full flex flex-col items-center overflow-y-auto px-4 py-2 ">
        <div className='min-w-[200px] h-[35vh] max-w-100 bg-blue-200 rounded-lg'   style={{
    backgroundImage: `url(${info.image_link})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top",
  }}>
          
        </div>
    </div>
    <DrawerFooter>
      {/* <Button>Submit</Button>
        <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
        </DrawerClose> */}
    </DrawerFooter>
  </DrawerContent>
</Drawer>
  
  )
}

export default BookDrawer