"use client";
// import DOMPurify from "dompurify";

export function HtmlDataConversion({ description }) {
  // const content = DOMPurify.sanitize(description);
  return (
    <div className="text-gray-500 text-sm mb-3">
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
}

// export default function HtmlDataConversion({ description }) {
//   return (
//     <div className="text-gray-500 text-sm mb-3 flex-grow">
//       <div dangerouslySetInnerHTML={{ __html: description }} />
//     </div>
//   );
// }

export function HtmlContent({ html, className = "" }) {
  return (
    <div
      className={`text-sm ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

import React from "react";
// import parse from "html-react-parser";
// const HtmlRenderer = ({ htmlContent }) => {
//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="bg-gray-50 shadow-md rounded-lg p-6">
//         {parse(htmlContent, {
//           replace: (domNode) => {
//             // Handle table
//             if (domNode.name === "table") {
//               return (
//                 <table className="min-w-full divide-y divide-gray-200">
//                   {domNode.children.map((child, index) => (
//                     <React.Fragment key={index}>{parse(child)}</React.Fragment>
//                   ))}
//                 </table>
//               );
//             }
//             // Handle table headers
//             if (domNode.name === "th") {
//               return (
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {domNode.children.map((child, index) => (
//                     <React.Fragment key={index}>{parse(child)}</React.Fragment>
//                   ))}
//                 </th>
//               );
//             }
//             // Handle table cells
//             if (domNode.name === "td") {
//               return (
//                 <td className="px-6 py-4 text-sm text-gray-500">
//                   {domNode.children.map((child, index) => (
//                     <React.Fragment key={index}>{parse(child)}</React.Fragment>
//                   ))}
//                 </td>
//               );
//             }
//             // Handle unordered lists (for content like "- Item")
//             if (domNode.name === "ul") {
//               return (
//                 <ul className="list-disc pl-5">
//                   {domNode.children.map((child, index) => (
//                     <React.Fragment key={index}>{parse(child)}</React.Fragment>
//                   ))}
//                 </ul>
//               );
//             }
//             // Handle list items
//             if (domNode.name === "li") {
//               return (
//                 <li className="text-sm text-gray-500">
//                   {domNode.children[0]?.data || ""}
//                 </li>
//               );
//             }
//             // Handle strong tags
//             if (domNode.name === "strong") {
//               return (
//                 <strong className="font-bold">
//                   {domNode.children[0]?.data || ""}
//                 </strong>
//               );
//             }
//             return null;
//           },
//         })}
//       </div>
//     </div>
//   );
// };

// export default HtmlRenderer;
