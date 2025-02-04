import { ToastContextProvider } from "@/Providers/ToastProvider";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface PrivateLayoutProps {
 children: ReactNode 
}

export default async function PrivateLayout({children}: PrivateLayoutProps){
  const session = await getServerSession()

  if(session) {
    redirect('/todos')
  } 

  return (
    <ToastContextProvider>      
      {children}
    </ToastContextProvider>    
  )
}