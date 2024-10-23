"use client";

import EmailDetails from "@/components/EmailDetails";
import EmailList from "@/components/EmailList";
import Filters from "@/components/Filters";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentEmail, setCurrentEmail] = useState();
  const [emailList, setEmailList] = useState(true);

  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  const [currentPage, setCurrentPage] = useState(1);

  const [allFilters, setAllFilters] = useState([
    "unread",
    "read",
    "favourites",
  ]);
  const [currentFilter, setCurrentFilter] = useState<
    "unread" | "read" | "favourites"
  >("read");

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://flipkart-email-mock.now.sh/?page=${currentPage}`
        );
        setEmailList(response?.data?.list); // Set the fetched emails
      } catch (error) {
        setError("Failed to fetch emails. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [currentPage]);

  // Conditionally render based on loading or error state
  if (loading) {
    return <p>Loading emails...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="min-h-[90vh] py-8 lg:py12 px-2 md:px-4 lg:px-12 bg-[#F4F5F9] space-y-4 md:space-y-8 text-[#636363]">
      <section className="space-x-20">
        <Filters
          allFilters={allFilters}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />
      </section>
      <section className="grid grid-cols-3 gap-x-4">
        <div className={`${currentEmail ? "col-span-1" : "col-span-3"}  `}>
          <EmailList
            currentEmail={currentEmail}
            emailList={emailList}
            setCurrentEmail={setCurrentEmail}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        {currentEmail && (
          <div className="col-span-2 border">
            <EmailDetails currentEmail={currentEmail} />
          </div>
        )}
      </section>
    </main>
  );
}
