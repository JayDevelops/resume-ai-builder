import { Navbar } from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl">
                Build Your Perfect Resume with AI
              </h1>
              <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
                Create a professional, tailored resume in minutes with our
                AI-powered resume builder. Stand out from the crowd and land
                your dream job.
              </p>
              <div className="mt-8 sm:mt-10">
                <button className="bg-primary hover:bg-primary/60 text-white font-bold py-3 px-6 rounded-md text-lg transition duration-300 ease-in-out">
                  Get Started
                </button>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <Image
                src="/landingPage.svg"
                alt="AI Resume Builder"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-muted">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground text-sm">
            &#169; {currentYear} AI Resume Builder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
