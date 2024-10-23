"use client";

import EmailDetails from "@/components/EmailDetails";
import EmailList from "@/components/EmailList";
import Filters from "@/components/Filters";
import { useState } from "react";

export default function Home() {
  const [currentEmail, setCurrentEmail] = useState();
  const [emailList, setEmailList] = useState();

  const [allFilters, setAllFilters] = useState([
    "unread",
    "read",
    "favourites",
  ]);
  const [currentFilter, setCurrentFilter] = useState<
    "unread" | "read" | "favourites"
  >("read");

  return (
    <main className="min-h-[90vh] py-8 lg:py12 px-2 md:px-4 lg:px-8 bg-[#F4F5F9] space-y-4 md:space-y-8">
      <section className="space-x-20">
        <Filters
          allFilters={allFilters}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />
        {currentFilter}
      </section>
      <section className="grid grid-cols-3 gap-x-4">
        <div
          className={`${currentEmail ? "col-span-1" : "col-span-3"}  border`}
        >
          <EmailList currentEmail={currentEmail} emailList={emailList}/>
        </div>
        {currentEmail && (
          <div className="col-span-2 border">
            <EmailDetails currentEmail={currentEmail}/>
          </div>
        )}
      </section>
    </main>
  );
}
