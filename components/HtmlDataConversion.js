export default function HtmlDataConversion({ description }) {
  return (
    <div className="text-gray-500 text-sm mb-3 flex-grow">
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
}

export function HtmlContent({ html, className = "" }) {
  return (
    <div
      className={`text-sm ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
