"use client";

import EmailDetails from "@/components/EmailDetails";
import EmailList from "@/components/EmailList";
import Filters from "@/components/Filters";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentEmail, setCurrentEmail] = useState();

  const [emailList, setEmailList] = useState<Email[]>([]);
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
  >("unread");

  const saveEmailListToLocalStorage = (emails: Email[]) => {
    localStorage.setItem("emailList", JSON.stringify(emails));
  };

  const handleEmailFavourite = (emailToUpdate: Email) => {
    console.log("Email to update for favourite", emailToUpdate);

    // setEmailList((prevEmailList) =>
    //   prevEmailList.map((email) =>
    //     email.id === emailToUpdate.id ? { ...email, isFavourite: !email.isFavourite } : email
    //   )
    // );
    setEmailList((prevEmailList) => {
      const updatedEmailList = prevEmailList.map((email) =>
        email.id === emailToUpdate.id
          ? { ...email, isFavourite: !email.isFavourite }
          : email
      );
      saveEmailListToLocalStorage(updatedEmailList);
      return updatedEmailList;
    });
    setCurrentFilter(emailToUpdate.isFavourite ? "read" : "favourites");
  };

  const handleIsRead = (emailToUpdate: Email) => {
    console.log("Email to update for isRead", emailToUpdate);

    // setEmailList((prevEmailList) =>
    //   prevEmailList.map((email) =>
    //     email.id === emailToUpdate.id ? { ...email, isRead: !email.isRead } : email
    //   )
    // );

    setEmailList((prevEmailList) => {
      const updatedEmailList = prevEmailList.map((email) =>
        email.id === emailToUpdate.id
          ? { ...email, isRead: !email.isRead }
          : email
      );
      saveEmailListToLocalStorage(updatedEmailList);
      return updatedEmailList;
    });
  };

  useEffect(() => {
    const storedEmails = localStorage.getItem("emailList");
    if (storedEmails) {
      setEmailList(JSON.parse(storedEmails));
      setLoading(false);
    } else {
      // Fetch emails with pagination
      const fetchEmails = async (page: number) => {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://flipkart-email-mock.now.sh/?page=${page}`
          );
          const emails = response?.data?.list.map((email) => ({
            ...email,
            isRead: false,
            isFavourite: false,
          }));
          setEmailList(emails);
          saveEmailListToLocalStorage(emails);
        } catch (error) {
          console.log("Failed to fetch emails.", error);
          setError("Failed to fetch emails. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchEmails(currentPage);
    }
  }, [currentPage]);

  // Conditionally render based on loading or error state
  if (loading) <p>Loading emails...</p>;
  if (error) return <p>{error}</p>;

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
        <div className={`${(currentEmail) ? "hidden md:flex col-span-1" : "col-span-3"}  `}>
          <EmailList
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
            emailList={emailList}
            currentEmail={currentEmail}
            setCurrentEmail={setCurrentEmail}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            handleIsRead={handleIsRead}
          />
        </div>
        {currentEmail && (
          <div className="col-span-3 md:col-span-2 border">
            <EmailDetails
              currentEmail={currentEmail}
              handleEmailFavourite={() => handleEmailFavourite(currentEmail)}
              setCurrentEmail={setCurrentEmail}
            />
          </div>
        )}
      </section>
    </main>
  );
}
