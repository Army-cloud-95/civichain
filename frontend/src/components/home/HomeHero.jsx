import React from "react";

const HomeHero = () => {
  return (
    <section className="min-h-screen">
      <div className="grid grid-cols-2 max-w-7xl mx-auto h-full min-h-screen px-12">
        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-6xl font-bold">
            Make Your City Better, <br className="hidden md:inline" />
            One Report at a Time
          </h1>
          <p className="text-lg">
            Spotted a pothole? Broken streetlight? Help improve your community
            by reporting issues directly to your local municipality.
          </p>

          <div className="flex gap-4">
            <button className="">Report an Issue &rarr;</button>
          </div>
        </div>

        <div className="image">
          <img src="/vite.svg" alt="Home Hero Image" />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
