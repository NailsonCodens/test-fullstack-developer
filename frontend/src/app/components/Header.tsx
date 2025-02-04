
import { getServerSession } from "next-auth"
import Logout from "./Logout"
import Image from "next/image"
import logo from '../../assets/Logo.png'
import Link from "next/link"
import { nextAuthOptions } from "../api/auth/[...nextauth]/options"

export default async function Header(){
  const session = await getServerSession(nextAuthOptions)


  return (
  <>
      <div className="bg-header flex items-center justify-between h-[120px]">
        <div className="flex items-center justify-normal">
          <div> 
            <Link href="/todos" prefetch={false}>
              <Image src={logo} width={70} height={70} alt="Logo tipo da empresa Todo List"/>
            </Link>            
          </div>
        </div>
        <div className="flex mr-4">
          <p className="text-texttodo mr-10">Olá {session && session?.user.name}</p>
          <Logout/>          
        </div>
      </div>
  </>
 ) 
}