
'use client'
import { useRouter } from 'next/navigation';
import { ArrowRight, HeartPulse, Menu } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="h-16 mb-10 dark:bg-[#0A0A0A] mt-4 bg-white border-b dark:border-b-gray-800 border-b-gray-200 top-0 left-0 right-0 duration-300 z-10">
      <div className="bg-red-700 sticky top-0 z-50 items-center w-full justify-between hidden mx-auto max-w-7xl md:flex">
        <nav className="text-white flex w-full justify-between items-center p-4">
          <div className="flex items-center gap-4">
            <HeartPulse size={30} className="text-white" />
            <h1 className="text-white font-semibold">Blood Link</h1>
          </div>
          <div>
            <ul className="flex text-white list-none flex-row items-center justify-center font-medium">
              <li className="mr-4 cursor-pointer" onClick={() => router.push("/")}>
                Home
              </li>
              <li className="mr-4 cursor-pointer" onClick={() => router.push("/about")}>
                About
              </li>
              <li className="mr-4 cursor-pointer" onClick={() => router.push("/donors")}>
                Donors
              </li>
              <li className="mr-4 cursor-pointer" onClick={() => router.push("/emergency")}>
                Emergency
              </li>
              <li className="mr-4">
                <Button
                  variant="outline"
                  className="text-white bg-red-700"
                  onClick={() => router.push("/donate")}
                >
                  Donate Now <ArrowRight />
                </Button>
              </li>
              <li>
                <SignedOut>
                  <SignInButton>
                    <Button className="bg-white text-red-700">Login</Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="flex items-center justify-between h-full px-4 md:hidden">
        <HeartPulse size={30} className="text-red-700" />
        <h1 className="text-red-700 text-2xl font-semibold">Blood Link</h1>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;


const MobileNavbar = () => {
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="text-black bg-gray-100 rounded-full hover:bg-gray-200">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex bg-red-700 flex-col" >
        <SheetHeader className="flex flex-col items-center justify-between mt-2">
          <SheetTitle>
            <div className="flex items-center justify-between h-full px-4 md:hidden">
              <HeartPulse size={30} className="text-white" />
              <h1 className="text-white font-semibold">Blood Link</h1>
            </div>
          </SheetTitle>
        </SheetHeader>
        <nav className="text-white flex w-full justify-between items-center p-4">
          <div>
            <ul className="flex text-white list-none  flex-col items-center justify-center font-medium">
              <li className="mr-4 cursor-pointer" onClick={() => router.push("/")}>
                Home
              </li>
              <li className="mr-4 cursor-pointer" onClick={() => router.push("/about")}>
                About
              </li>
              <li className="mr-4 cursor-pointer" onClick={() => router.push("/donors")}>
                Donors
              </li>
              <li className="mr-4 cursor-pointer" onClick={() => router.push("/emergency")}>
                Emergency
              </li>
              <li className="mr-4">
                <Button
                  variant="outline"
                  className="text-white bg-red-700"
                  onClick={() => router.push("/donate")}
                >
                  Donate Now <ArrowRight />
                </Button>
              </li>
              <li>
                <SignedOut>
                  <SignInButton>
                    <Button className="bg-white text-red-700">Login</Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </li>
            </ul>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};