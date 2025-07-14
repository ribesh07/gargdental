"use client";
import React, { useEffect, useState } from "react";
import { fetchCompliances } from "@/utils/apiHelper";

export default function CompanyInfo() {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCompliances();
        console.log("Fetched company info:", data);
        const compliances = data.compliances || [];
        const section = compliances.find(
          (item) => item.key === "about_company"
        );
        setContent(section?.value || "No company information found.");
        setFiles(section?.compliancefiles || []);
      } catch (err) {
        setError("Failed to fetch company info.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#0072bc] mb-6">
        Company Information
      </h1>

      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div
            className="prose text-gray-700 text-[15px]"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {files.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2 text-[#0072bc]">
                📎 Download Attachments
              </h2>
              <ul className="list-disc pl-5">
                {files.map((file) => (
                  <li key={file.id}>
                    <a
                      href={file.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {file.title || file.filename}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 text-[14px] text-gray-600">
            <p>
              For further verification, please refer to our
              <a href="/BusinessReg" className="text-blue-600 underline ml-1">
                Business Registration
              </a>{" "}
              and
              <a
                href="/MedicalCertification"
                className="text-blue-600 underline ml-1"
              >
                Medical Certifications
              </a>
              .
            </p>
          </div>
        </>
      )}
    </div>
  );
}
