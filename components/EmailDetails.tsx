import { formatDate } from "@/utils";
import React from "react";
import DOMPurify from "dompurify";

function EmailDetails({ currentEmail }: any) {
  const sanitizedBody = DOMPurify.sanitize(currentEmail?.body || "");

  return (
    <div className="px-2 py-3 lg:py-5 lg:px-6 bg-[#f2f2f2] flex gap-x-6 items-start h-auto">
      <section className="w-max h-auto">
        <div className="capitalize rounded-full flex items-center justify-center p-3 w-10 h-10 bg-[#e54065] text-white">
          {currentEmail.from.name[0]}
        </div>
      </section>
      <section className="w-full">
        <header className="space-y-4">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-3xl font-bold">{currentEmail?.subject}</h1>
            <button className="bg-[#e54065] text-white rounded-3xl px-3 py-[1px]">
              Mark as favourite
            </button>
          </div>
          <p>{formatDate(currentEmail?.date)}</p>
        </header>
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: sanitizedBody }}
        />
      </section>
    </div>
  );
}

export default EmailDetails;
