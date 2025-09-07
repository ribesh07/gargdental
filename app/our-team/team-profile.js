"use client";
import React, { useState, useEffect } from "react";
import { apiRequest } from "@/utils/ApiSafeCalls";
import { Mail } from "lucide-react"; // Email icon
import Link from "next/link";

export default function TeamSection() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        console.log("Fetching team data...");
        const response = await apiRequest("/our-team/active", false);

        if (!response?.teams || !Array.isArray(response.teams)) {
          console.warn("Team data is missing or not an array");
          return;
        }

        console.log("Team API Response:", response.teams);
        setTeam(response.teams);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div className="max-w-7xl mx-auto bg-white">
  {/* Leadership Section */}
  <div className="bg-gray-50 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
        Our Team
      </h2>

      {/* Team Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
        {team.map((member) => (
          <div key={member.id} className="text-center relative">
            <img
              src={`https://gargdental.omsok.com/storage/app/public/${member.team_image}`}
              alt={member.team_name}
              className="w-32 h-32 rounded-full mx-auto object-cover shadow"
            />

            <Link
              href={`mailto:${member.team_email}`}
              className="absolute top-0 right-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center transform translate-x-4 translate-y-20 hover:bg-red-700 transition"
            >
              <Mail className="text-white w-4 h-4" />
            </Link>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {member.team_name}
            </h3>
            <p className="text-sm text-gray-600">{member.team_role}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

  );
}
