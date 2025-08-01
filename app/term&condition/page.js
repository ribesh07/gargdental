"use client";
import React, { useEffect, useState } from "react";
import { fetchCompliances } from "@/utils/apiHelper";

export default function PrivacyPolicy() {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      const data = await fetchCompliances();
      const compliances = data.compliances || [];
      const section = compliances.find(
        (item) => item.key === "terms_conditions"
      );
      setContent(section?.value || "No data found.");
      setFiles(section?.compliancefiles || []);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8 bg-gray-50 rounded-xl shadow mt-6 mb-10 text-gray-800">
      
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
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">
                Download Certificates
              </h2>
              <ul>
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
        </>
      )}
    </div>
  );
}
