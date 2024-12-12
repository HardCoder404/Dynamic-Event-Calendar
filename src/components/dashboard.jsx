import React from 'react'
import Events from './events';
import Calendar from './calendar';

const Dashboard = () => {
  return (
    <section class="relative bg-stone-50">
      <div class="bg-sky-400 w-full sm:w-40 h-40 rounded-full absolute top-1 opacity-20 max-sm:right-0 sm:left-56 z-0"></div>
      <div class="bg-emerald-500 w-full sm:w-40 h-24 absolute top-0 -left-0 opacity-20 z-0"></div>
      <div class="bg-purple-600 w-full sm:w-40 h-24 absolute top-40 -left-0 opacity-20 z-0"></div>
      <div class="w-full py-24 relative z-10 backdrop-blur-3xl ">
        <div class="w-full max-w-7xl mx-auto px-2 lg:px-8">
          <div class="grid grid-cols-12 gap-8 max-w-4xl mx-auto xl:max-w-full ">
            <Events/>
            <Calendar/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard