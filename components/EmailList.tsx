import { formatDate } from "@/utils";
import axios from "axios";
import React from "react";

function EmailList({
  currentEmail,
  emailList,
  setCurrentEmail,
  currentPage,
  setCurrentPage,
}: any) {
  const fetchEmailDetails = async (email) => {
    const response = await axios.get(
      `https://flipkart-email-mock.now.sh/?id=${email.id}`
    );
    setCurrentEmail({
      ...email,
      body: response?.data?.body,
    });
  };

  return (
    <div className="space-y-8 flex flex-col">
      <section className="flex flex-col gap-y-3">
        {emailList.length > 0 &&
          emailList.map((email, idx) => (
            <div
              className="cursor-pointer hover:shadow-sm hover:shadow-[#c3c1c1] border border-[#cfd2dc] px-4 py-2 rounded-lg flex gap-x-4 items-start"
              key={idx}
              onClick={() => fetchEmailDetails(email)}
            >
              <section className="w-max">
                <div className="rounded-full flex items-center justify-center p-3 w-10 h-10 bg-[#e54065] text-white capitalize">
                  {email.from.name[0]}
                </div>
              </section>
              <section className="">
                <div className="flex items-center gap-x-1">
                  <span>From:</span>
                  <span className="font-bold">{email.from.email}</span>
                </div>
                <div className="flex items-center gap-x-1">
                  <span>Subject:</span>
                  <span className="font-bold">{email.subject}</span>
                </div>
                <div className="flex items-center gap-x-3">
                  <p>{email.short_description}</p>
                </div>
                <div className="flex items-center gap-x-3">
                  <span>{formatDate(email.date)}</span>
                </div>
              </section>
            </div>
          ))}
      </section>
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
