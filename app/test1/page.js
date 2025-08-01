"use client";
import React, { useState, useEffect } from "react";

function TypewriterParagraph({ text, className = "" }) {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 7); // Adjust typing speed here
    return () => clearInterval(interval);
  }, [text]);
  return <p className={className}>{displayedText}</p>;
}

export default function Test() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Video Section */}
      <div className="max-w-7xl mx-auto h-100 relative overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          playsInline
          muted
        >
          <source
            src="https://dentalkart-application-media.s3.ap-south-1.amazonaws.com/about-us/Website+About+us+page+video+%402.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* About DentalKart Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About Garg Dental
            </h2>
            <TypewriterParagraph
              className="text-lg text-gray-600 leading-relaxed p-2 sm:p-4"
              text={
                "Inndia is not merely a nation; it is a timeless legacy of culture, resilience, and unity in diversity. From its rich heritage to its modern advancements, India stands as a beacon of progress rooted in deep values. I take immense pride in being part of a country that embraces inclusivity, innovation, and tradition with equal grace. Every region, every language, and every citizen contributes to the vibrant fabric of this incredible nation. To love India is to uphold its ideals and strive for its continued growth and harmony. I am honored to call this extraordinary land my home. Jai Hind."
              }
            />
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg w-full h-full sm:w-2xl sm:h-96 mr-9 ml-0.5 text-white overflow-hidden flex items-center justify-center">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Our Story
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="flex justify-center">
              <div className="relative">
                <div>
                  <div>
                    <div className="text-center">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl8rTz4u2j6tF1pyoeCFUXM63aMwaloAyDxA&s"
                        alt="Dr. Vikas Aggarwal"
                        className="w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center"
                      />
                      <h3 className="text-xl font-bold text-gray-900">ACG</h3>
                      <p className="text-sm text-gray-600">CEO OF ACG</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <TypewriterParagraph
                className="text-lg text-gray-600 leading-relaxed"
                text={
                  "Inndia is not merely a nation; it is a timeless legacy of culture, resilience, and unity in diversity. From its rich heritage to its modern advancements, India stands as a beacon of progress rooted in deep values. I take immense pride in being part of a country that embraces inclusivity, innovation, and tradition with equal grace. Every region, every language, and every citizen contributes to the vibrant fabric of this incredible nation. To love India is to uphold its ideals and strive for its continued growth and harmony. I am honored to call this extraordinary land my home. Jai Hind.India stands as a beacon of progress rooted in deep values. I take immense pride in being part of a country that embraces inclusivity, innovation, and tradition with equal grace. Every region, every language, and every citizen contributes to the vibrant fabric of this incredible nation. To love India is to uphold its ideals and strive for its continued growth and harmony."
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <TypewriterParagraph
                className="text-lg text-gray-600 leading-relaxed mb-8"
                text={
                  "Inndia is not merely a nation; it is a timeless legacy of culture, resilience, and unity in diversity. From its rich heritage to its modern advancements, India stands as a beacon of progress rooted in deep values. I take immense pride in being part of a country that embraces inclusivity, innovation, and tradition with equal grace. Every region, every language, and every citizen contributes to the vibrant fabric of this incredible nation. To love India is to uphold its ideals and strive for its continued growth and harmony. I am honored to call this extraordinary land my home. Jai Hind."
                }
              />
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div>
                  <div>
                    <div className="text-center">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnokC-TOf0VTEOtde4YzJuZ3J06AsnAweogg&s"
                        alt="Sandeep Aggarwal"
                        className="w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center"
                      />
                      <h3 className="text-xl font-bold text-gray-900">Abc</h3>
                      <p className="text-sm text-gray-600">MD OF AB.PVT LTD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-blue-900 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <div className="text-3xl mb-2">🏪</div>
              <h3 className="text-lg font-semibold">20,000+ Dental Products</h3>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="text-lg font-semibold">450+ Trusted Brands</h3>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl mb-2">🌐</div>
              <h3 className="text-lg font-semibold">100% Original</h3>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="text-lg font-semibold">Assured Best Prices</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚙️</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                Operational Excellence
              </h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⏳</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                Respect for Time
              </h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                Ownership and Accountability
              </h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💎</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                Inclusivity
              </h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">👥</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                Customer Obsession
              </h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📈</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                Collaborative Growth
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Our Team
          </h2>

          {/* Top Row */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="text-center relative">
              <img
                src="data:image/jpeg;base64,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"
                alt="Profile Picture"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <div className="absolute top-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center transform translate-x-4 translate-y-20">
                <span className="text-white text-sm font-bold">in</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Virat Kohli
              </h3>
              <p className="text-sm text-gray-600">Technology</p>
            </div>
            <div className="text-center relative">
              <img
                src="data:image/jpeg;base64,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"
                alt="Profile Picture"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <div className="absolute top-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center transform translate-x-4 translate-y-20">
                <span className="text-white text-sm font-bold">in</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Virat Kohli{" "}
              </h3>
              <p className="text-sm text-gray-600">Technology</p>
            </div>
            <div className="text-center relative">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwF_QVGW2AIMjHaqkFRR_UQA7tc8QofDuGDQ&s"
                alt="Profile Picture"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <div className="absolute top-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center transform translate-x-4 translate-y-20">
                <span className="text-white text-sm font-bold">in</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Virat Kohli{" "}
              </h3>
              <p className="text-sm text-gray-600">Business Operations</p>
            </div>
            <div className="text-center relative">
              <img
                src="data:image/jpeg;base64,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"
                alt="Profile Picture"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <div className="absolute top-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center transform translate-x-4 translate-y-20">
                <span className="text-white text-sm font-bold">in</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Virat Kohli{" "}
              </h3>
              <p className="text-sm text-gray-600">Supply Chain</p>
            </div>
            <div className="text-center relative">
              <img
                src="data:image/jpeg;base64,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"
                alt="Profile Picture"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <div className="absolute top-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center transform translate-x-4 translate-y-20">
                <span className="text-white text-sm font-bold">in</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Virat Kohli{" "}
              </h3>
              <p className="text-sm text-gray-600">CFO</p>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="text-center relative">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ76-iLvvthCkAHq1Wb0_GX40JYi6KUxiISGQ&s"
                alt="Profile Picture"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <div className="absolute top-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center transform translate-x-4 translate-y-20">
                <span className="text-white text-sm font-bold">in</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Anushka Sharma
              </h3>
              <p className="text-sm text-gray-600">CS</p>
            </div>
            <div className="text-center relative">
              <img
                src="data:image/jpeg;base64,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"
                alt="Profile Picture"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <div className="absolute top-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center transform translate-x-4 translate-y-20">
                <span className="text-white text-sm font-bold">in</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Anushka Sharma{" "}
              </h3>
              <p className="text-sm text-gray-600">Content</p>
            </div>
            <div className="text-center relative">
              <img
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUVFRUVFRcVFRUVFRUXFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQFy0lICUtLS0tLTUtLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAADBAACAQUGB//EAEEQAAIBAgQDBgMGAwYFBQAAAAECAAMRBBIhMQVBUQYTImFxgTKRoQdCUrHB8IKS8RRicrLR4SNjc6KjFRYlQ0T/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAwIBBAX/xAAfEQEBAAIDAQEBAQEAAAAAAAAAAQIRAyExEkEEMiL/2gAMAwEAAhEDEQA/APKVWXAkmQIGJdUllW0sBAxaZAlwkvAGElgolwssFgUAmcsIBLBDAFkmQkKElgsAQXylshmXqqDYkD1i1PiVMn7wHUjQ+YgMZJnu4svElzWKtl5N/t7TYKARcag7QA5JMgjGXykyeUAGQTGQRjL5SZfKAvkmMkYKzBSAsVMqVjJWVIgLFJUiMlJQiAuVlCsYZZQiAGSFyyQFAIUCQCWVbwMAQiraZAlwsCoEIqzIEuqdYFQsuElwJcLAoBLBIQLLBIAsomsq8TYkrTQN0sSfXlr847xZP+GTmKgb2+95TRYMqT4Wb8vqDAO4R9Xdldt+a/4bQVasgA0sRa9iQGtzPT6x/FIFGYlXBADKw19CR/pEFwVWpbIrFb+E2Jt/FzHvAUOJCk5R4Tcdba3/ADjvDOJMvPMvMHdfMeX7tLVuAVwM2U7G/W1tbdRNXUosC1xb09b/ACnJZXbLHaYSuKi3HuDuDD5JzvZl27wr1Gvsf6zqck64BkkyGHySZIC5WUKRrLKlYCpSVZYyUlSICxSDIjRSDZYCzJKERkrBssAGSYhchkgJKIYCVUWhEEDKrLqLyKLwoEDAWXVZZVhFSBULCKssBCKkCqpLhZcLCKsDX8Wp3o1L8lJ08hcTsexPYXD9wpqpndwGN9hcXsB7zmOIUr0nH90z1/s8tkUdABIc2VmpHp/nxl3a0w+zvBCpn7vb7p1X5GP4rA06a5UpqAOQA0m+xN5qeIKbesjlbXoxklcXxwqFbQTy/i2Iytcc/ry1novaJSbjlz1nmnF6BBPMCU4ekP6O/CyYm1bMh+8Le/L22noIHlOC7O4XPiKY5A5j/Dr+dp6LlnpeUvl8pjIIzlmCIC3dypSMlJXJAVKyhWNMsGyQFmSDIjJWUYQFWWDZYyRBOsAGUyQskDXAQoEqghUWBZRCqJVRDIIGUWEVbyKt4VRAirCKsyohVWBVUhFWXVIRVgDamCCOohMNxDH4YMf7SajU1VqqtTsiZvhGcaDlbb85cLO/pcDSvSR8zISiglDa4sDZuslyXWul+HH6321fZTthWxisTSKtTQM2hsQeYuAbbH3nFYni/EeIYhqVJmVAz6JYNZfisdr2HM2np+C4ZTwqVRTufD4mOpN+pnEdh6FOs9am2ZXzFxYlbhibkW87yGOWq9GWG5Jt57j8OrOFUV8xuA1Rr5yNCdNLSnEOHVKSFam/L0nr79lsNRdq7Zmf8TsWPteeZ9uMeHqEDlKzPd0lnxzHHbS8HpM1N1WwHhZz94qDYKD03Jnf0aVha97XF/Q2/ScVwG+UBbXqeCwvtpufPUeW87xKVgBfb6+cpj7UctfMgRUzBEPkmCJtMuVlSsYKyhWAuRKMkYKyjLAWZYFljTrBOsBVlgyIyywTCADJMQlpIGtUQwEoghUEC6iGAlUWGQQLKIVVlUEOggRVhVSZVYRVgYVYVRIohFECBZ0/ZvjoWkyuwHdEhiTYKN1JJ8iJzirOa7XhlKEEinUKrUtsShzL72J+Uxnh9RTj5LhXV9qO11PNWRMU4VkQKVpqyq7HXmCeup000nJdlOPrRxIarVchFZQbC7BmG9vQTb4rsxgEUVGxjqpAIzKXBGmWxUfvyiNbs5gfD3eIqVc1vhUUxl53YgZRpJTHHS+X3ve46TtV2mSph89JwwJy6bg9COU8v4vU01PiOre/KG7QFKTutAnuiRa5vcgbg9NTb1mnq1Sx1m8OPXaOfJcund9iuHL3S1iSW8QA0yjUi487Tp8k4/sjxxaaLRqCy5wocbBnJIDeVxuOo9Z2/dyqNyLlJgrGMkqRDkyLFZUrGGWDIhouywbCMssE6wF2EE6xkiCYQFnWBcRlhBOIAJITLJA1IEMog0EPTEAiCGUSlMQyiBdFh0EoohlEC6iEUTCiFUQMgQirMKsIBAgEBxLh61qbU2+8ND0PIiGxFdKalnZVUbliAJynE+2hvlwyeWdx9VT9T8octI4fGNSvQrktTV7tTJIBOo052HTzHmYvX4t/we6FgAxIC6A5jca7na0378AWtw+jjKj2rVKlTO7c07w0lJHl3ZOlrAxbEdhWpjMaqkHcAGx2O59/nMW4y9qY45WdORxd202A/pp8oXC4FmIsCSSAANyToBN5Q4AXIVFJN7AKLknYAAc5t8ZSXhtP4gcU66ZSGFBHQ3II3qEMBmB0uQI+vrwuPz65ftGVooMItiUN6zDUGrrnCnmosqg88l+c3fZTtioXusU1itglQgm46PbmPxfPa54uvc6mUWnt7zadm3t1GqrqGRgynUFSCD6ES5E8g4VxivhWvSawPxIwujeo6+YsZ2/CO21CpZaw7lup1pn+Ll7j3hm4ulZYNhDI4IBBBBFwQbgjqCN5hlhyXRVhBsIywgmEKFnWDYRhhAsIC7LAsI04gXEBe0kLaZgaVBDqIJRDpvAKoh0EEkYpiASmIZBKKIZRAvTEKolVEKogBxmLSkheowVRzP5Acz5CchxPtlUa60FCL+JtXPmBsv1mp7Q4o1cRUJJsrFVB+6FOXQcr2v7xRaUClaoznM7Fm6sSx+ZmaTMD67y5py+SB6p2arri+G06Kj4KdXCsunxPlqZif7/LbZhra0Y4KzNhAlUXZLoT5oSD+U4bsNxPuK+U5itYpSIVQxzlwKLWJHwsb6G9iRznq3EuFf2ZmYAilUqE630Z/Ff+Ilj5G45C8ebHc2v/AD5yZarWcN4VUNNXpjIhLZqlyG8INlW2t9LkAa2A9fMu3NN0xDq+hNSq3+Je9ZUb08Jt6CescWxpoYOoadxYCxAXw5myXu22jHW4Pna88Z49xA4mu9XkbBeXgRQiadSFBPmTNcV3jGOWWZ3bVhNNZWhTGYjeGq6Cw3P7vGcJhco1lErdF3pQTUo9UWCIEOi8L41iMLpTfw/gYZlPoOXqCJ1vAO2q1qgpVUFNmsFYG6ljyIOq35bzhKwvFixBBBsQQQehEOWbe3OIFxL4OuKlNKnJ0Vv5lB/WZYQzjSziCcRhhAsIbLsIFxGGECwgBkmbSQNTTEPTECm0YUQCIIwggVEYpiAVYZBrBIIamIBUEmIqBUZibBVJJ8gLyyTW9p6mXC1T1AX+ZgD9CYHnwBJuxJJ3JNySdb39fzjFNIM7Rmk1xeBRklAIxKMIc2d7N6YmgemIoH5VknvP2iXGAqFSNKlAmxJAArqo2G4Phsenlr4PwYgVqRI0FakT6CopO8997eU74Ru8uEV6bMLWDKlVC1Ma3schtpbxrzGvL4YXVedfahjRTwNHDKfHVdalXY2XIe7Q6fhYseYzL1E8xCWFzOm7XcTbFYjM17KtrG2jP46hHQXIFrmwQAaCaNKWd8vJbFvXkP1+USamjLPd2xgcJfxMP6RusvKMjpEeJV8ik8zOp+0o3iaw5QdXeVwNTTzOvz2/fnM1IUhepE60aqGJ1N4dewdlmvg6B/5YHy0/SbGoIl2apZcHQH/KU/zDN+sfaE76BUEA8YMC0KQvUgXjDiAeAO0kzJA06cowkAsOkA1OMJtAU4wsAqiGQQQhxAIs0PbarbDqvNqg0vyUMb29bfOb+cp28q60U6B2PvYD8mgc2p0mcO1tOhlkgqgsbwDZpm8CHmVeAw18ptobaeRnuXa4riadJNBTel/aXIWnqjZBmLM1ycqsM3MW6TwoPpPU6mN/+JWu2pGCpYZCMuZcxegDvcC+fUanyAMM3p5tjcVcvVI3LNb/ABG4H6S/D6RVRf4m8Tep/wBNvaa3GVM1RaY2BzN+gh8XdjzhzTZVK1NR4mUHpfX5DWc3xfFB2sDoPKGr07DWw8v6RfAUSz5hewPS+sOya7NYanlFiNT5gennMVj5xusbevm2vyGkRqiCFqhgEQswUbsQo9SbCFqx/shhe9xlFeQcOfSn49fcAe8NPYKVIKoQbKAo9ALCVhoIwkAYEw7wL7wpj4AwgH2jDRdodDkkkgamnvDpA04dIBk2jCwCw6wDLvDrApvDJAIJo+F1qdTjKCooZV8ChtVLCmzC49SfcCb1BcgDnOWo9juI1KzVRTNImozq7OqlfFdTYXYW05cpnKyTut4S27k2d+0HgwpVe/pplp1DZgB4VfkRYWGb21HnOJxZ0nu+Ko95hxRxKK5K5Xy7MeqjcdR0njParhBw1QqLlG1psd/NW8x9ZPi5N9VXn4vm/U8aTvIZWiqzIqayzzmlq2U+X6/v6zqK/EgOEYdMw0rVmK3Gbws9jb+JRc9elpyd7+8vxDGhsPh6Q+73rN0Oaobf5YcoGBYlyx3Jm8p7Xmj4fuJtsRUssOZNfjat9o7hKIRQp+Lnfbz/AHaa/DDM+uw19xt9SI6zgaXH/cpPqevvBV6w/wAJ+cSqmFq1QeX5xOo8OwGsZ3P2X8O0q4gjpST6M5/yj5zhVps7Kii7MQoHUk2A+ZntvCOHrh6FOiv3FsT1Y6sfckwUzBNCwTQmE8C+8M+8C+8N4gNAGHaAaGgpJJIGrpwywNOGWAdYwsAsOsAybwybwKbwqwNnwPDVHroVyhFuzknb8IA5k6/Kdtp5H5X/AN55zw+o6YlWLAUyuUC/xMdgR7fUTr6dRtBltrqRtt57H5zx83+n0eCf8Rsl4aKzZSdANbaHyA+vynN9v+xWG7lXHeKRUogjvargirUWnorMQGGcHkN7+TPaPtG+CUV0QVFvlq072bKdnU2Oqn2sx00uOe4f23bieLpUSBSptUyLTzjOzFXJd2tcC1kWy6NUJ1KiV4pPnf683Pllc9Xxq/tE7J4LA0MItGke8qqxeoXds2RUuR4sjXNQHMBbQWnCJw5b/wC5nqf26/HhDp/+m9so1U0E2W+llUi5J1sbWtPLhWIl3lu/xlsAtxb13i54WGbcgW0H784130t30M7qlHhgGxMZqYMW6776wRxUE2LMO90zUC6aWHIdAfiHsbGa7Ftdrn0+f9PrLtUMXxAuDDsgVQkfX6fu8WqvD1qmg+cTGsNOy+zLhYqVnrt/9IGUf3nzC/sA3zHSemVJzf2dYXJgw1rGo7t7A5B7WWdG8M1SDMIYKGA3MA+8M0C0N4gtANDtF2hoOSSSBq6cMsAm0Mu0BhYcRdYcQDLDCBEKICXEKdNaiV6lUqqahfxOpuntqb+02X/v+jzNrcja/wCcS4lw1MQmV7ixuCu4O3PSedcW4YKNV6Z2B8JO5U6qf09QZPLjmV3VsOa4zUdF2k7ZCsSFNlIINtbjp5TlsFxB6dZKyDWm6uOV8rAgE+0EKI5RhFE1jjMfE8srl66ztN21/wDUadFKlPJUo31AADBgBoo0Fsqj2Gk5p762BNhc25Acz0EBoDcQFbE9VB3te/MeU0yaLEfLN006yhrxAVdvCNPXW/M6/laYFU6baC235nnAe76WFWId5M5/WA/3kpUqdIoKshqwK1GhcHSBuW5ajztqYKnTJOsdVVKnkLHbcaae047I9d7MVA2Dw5XbukH8oyn6gx4zQdg6t8DS8jUH/kY/rN/Op1VoOXcwbGGQjAGGYwLGFIE0A8M8A5h1SSSSBq02hkgKcMkA67Q6mATaGTaAcQq7QKbQqQDJEOLcEpYm2e4YaBlNiPI30I9Y8kvA4rGdiqy60qiuOjXRv1B+k0mO4ZiKWtSi6jrbMo8yy3E9VBiXaB7YWv8A9KoPmpH6w5a8qFQSrkGCFI9Zbumh0PIJZKcu3o26/wB7YWPr5fKTP101O4tppaBsuA4cd+ha1lN7G2vQakdZ13aLiGEODN1prWewXQk/GpbQXCWFMdfiO1yT5/iKvLqB+ZvAIhMOadfwHh+ExIILhXHLr5ibI9jad9Hv6GcGKZU3BN/LQw6Y6uu1RvnMXG/lWmeP7G541wv+zMBcNfz/ADmlxbplsNzbTmLfpKPjKh3N/XWLM1zczsl/WcspfHqH2b1b4Qr+Gqw+YVv1M6ozhfsureGunQ02HuGB/wAoncOZpG+qmDqGXgmMOQOoYJzLsYJ4UCqQLmFcwLGBiSUzSQNZTh0gKcMkA9OGpwFOGpmAdDC0zAKYUGAYQsCIRTAKhms7VVcuEq+YC/zsFP0JmwBmg7cYm2HVeb1Bp5KCxPzywOHp0V3hwgi7VABYHUkae+sYUwL01AZTa9iDbkbEGxm27XcaTGFMtAU1QN+Et4iPAMqgBFAsBqes04aVJgJNhByhkpWlmaVvAuqwbpLByNrHyMEXqHoIFHWBywzq/X6QZU9YHS/Z9jO7xWQnSqhX+JfEv5MPeelTxvg9fu69FydFqIT6Zhf6XnsbG0MZMOYJjMkwbmHcYoTBEy7mCcw0GYJjCOYGoYA7zMxJA19PeFWSSAZN4ZN5JIBYWSSAVNpdJJIBJyHbz4qPpU/NJJIHLH4hDySQIsxJJAE0xJJAkkkkDBgWkkgBbnPbTsPSSSGclDBSSQ7A3gqkkkOhPAVJJIFZJJIH/9k="
                alt="Profile Picture"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <div className="absolute top-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center transform translate-x-4 translate-y-20">
                <span className="text-white text-sm font-bold">in</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Anushka Sharma
              </h3>
              <p className="text-sm text-gray-600">Human Resources</p>
            </div>
            <div className="text-center relative">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ76-iLvvthCkAHq1Wb0_GX40JYi6KUxiISGQ&s"
                alt="Profile Picture"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <div className="absolute top-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center transform translate-x-4 translate-y-20">
                <span className="text-white text-sm font-bold">in</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Anushka Sharma{" "}
              </h3>
              <p className="text-sm text-gray-600">Import</p>
            </div>
            <div className="text-center relative">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJglCS3xlt9_2dKv0jilDZ_bJJEQlqJcvNag&s"
                alt="Profile Picture"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <div className="absolute top-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center transform translate-x-4 translate-y-20">
                <span className="text-white text-sm font-bold">in</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Anushka Sharma
              </h3>
              <p className="text-sm text-gray-600">Human Resources</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
