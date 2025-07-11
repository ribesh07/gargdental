"use client";
import React, { useEffect, useState } from "react";
import TawkToWidget from "@/components/TawkToWidget";
import { fetchCompliances } from "@/utils/apiHelper";

export default function MedicalCertifications() {
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
      const section = compliances.find((item) => item.key === "medical_certifications");
      setContent(section?.value || "No data found.");
      setFiles(section?.compliancefiles || []);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div>
      <TawkToWidget />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-[#0072bc] mb-4">Medical Certifications</h1>
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <div className="prose text-gray-700 text-[15px]" dangerouslySetInnerHTML={{ __html: content }} />
            {files.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Download Certifications</h2>
                <ul>
                  {files.map((file) => (
                    <li key={file.id}>
                      <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
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
    </div>
  );
}
