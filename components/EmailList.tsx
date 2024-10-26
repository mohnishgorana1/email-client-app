"use client";
import { formatDate } from "@/utils";
import axios from "axios";
import React from "react";

function EmailList({
  currentFilter,
  setCurrentFilter,
  emailList,
  currentEmail,
  setCurrentEmail,
  currentPage,
  setCurrentPage,
  handleIsRead,
}: any) {
  const fetchEmailDetails = async (email: Email) => {
    try {
      const response = await axios.get(
        `https://flipkart-email-mock.now.sh/?id=${email.id}`
      );

      // Mark email as read when details are fetched
      handleIsRead(email);

      setCurrentEmail({
        ...email,
        body: response?.data?.body,
      });


      setCurrentFilter("read")
    } catch (error) {
      console.log("Failed to fetch email details.", error);
    }
  };

  // Filter emails based on the current filter
  const filteredEmails = emailList.filter((email) => {
    if (currentFilter === "unread") return !email.isRead;
    if (currentFilter === "read") return email.isRead;
    if (currentFilter === "favourites") return email.isFavourite;
    return true; // Default case (shouldn't be reached)
  });

  return (
    <div className="space-y-8 flex flex-col">
      <section className="flex flex-col gap-y-3">
        {filteredEmails.length > 0 &&
          filteredEmails.map((email, idx) => (
            <div
              className="cursor-pointer hover:shadow-sm hover:shadow-[#c3c1c1] border border-[#cfd2dc] px-4 py-2 rounded-lg flex gap-x-4 items-start line-clamp-2"
              key={idx}
              onClick={() => fetchEmailDetails(email)}
            >
              <section className="w-max">
                <div className="rounded-full flex items-center justify-center p-3 w-10 h-10 bg-[#e54065] text-white capitalize">
                  {email.from.name[0]}
                </div>
                <div className="text-center">{email.id}</div>
              </section>
              <section className="">
                <div className="flex items-center gap-x-1">
                  <span>From:</span>
                  <span className="font-bold text-sm md:text-lg">{email.from.email}</span>
                </div>
                <div className="flex items-center gap-x-1">
                  <span>Subject:</span>
                  <span className="font-bold text-sm md:text-lg">{email.subject}</span>
                </div>
                <div className="flex items-center gap-x-3">
                  <p className="text-sm md:text-lg">{email.short_description}</p>
                </div>
                <div className="flex items-center justify-between gap-x-3">
                  <span className="text-sm md:text-lg">{formatDate(email.date)}</span>
                  <span className="text-[#e54065] font-semibold text-sm md:text-lg">
                    {email.isFavourite && "Favourite"}
                  </span>
                </div>
              </section>
            </div>
          ))}
      </section>
      {/* pagination */}
      <section className="self-center mx-auto border-[#cfd2dc] flex items-center border rounded-xl ">
        <button
          className={`font-bold text-[#e54065] px-4 py-2 ${
            currentPage === 1 && "bg-slate-200"
          }`}
          onClick={() => setCurrentPage(1)}
        >
          1
        </button>
        <button
          className={`font-bold text-[#e54065] px-4 py-2 ${
            currentPage === 2 && "bg-slate-200"
          }`}
          onClick={() => setCurrentPage(2)}
        >
          2
        </button>
      </section>
    </div>
  );
}

export default EmailList;
