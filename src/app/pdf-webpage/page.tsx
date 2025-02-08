"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import ReactDOMServer from 'react-dom/server';


import { Download } from "lucide-react";

interface DocxConverterButtonProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const DocxConverterButton = ({ contentRef }: DocxConverterButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  const handleConvertToDocx = async () => {
    if (!contentRef.current) {
      setError('Content reference is not available');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/convert-html-to-docx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          html: contentRef.current.innerHTML,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to convert document');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ReactDocument.docx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 flex flex-col items-start gap-2">
      <button
        onClick={handleConvertToDocx}
        disabled={isLoading}
        className={`inline-flex items-center px-4 py-2 rounded-md text-white 
          ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} 
          transition-colors duration-200 ease-in-out`}
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
            Converting...
          </div>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Convert to DOCX
          </>
        )}
      </button>
      {error && (
        <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

// Define interfaces for our component's types
interface PageElement extends HTMLElement { 
  cloneNode(deep?: boolean): PageElement;
  outerHTML: string;
}

type PageContent = Array<PageElement>;

const PrintablePageContent = () => {
  return (
    <Fragment>
                {/* Content components... */}
          {/* Note: Content remains the same, just fixing the textarea rows prop */}
          <textarea
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Add your comment..."
          ></textarea>
          {/* Rest of the content... */}

          {/* Default paragraph */}
          <p className="text-base leading-relaxed text-gray-600">
            This is a standard paragraph with comfortable line height and a
            subtle gray color for easy reading.
          </p>

          {/* Large, bold paragraph */}
          <p className="text-xl font-bold text-gray-900">
            Here&apos;s a larger, bolder paragraph that demands attention and
            emphasizes important information.
          </p>

          {/* Italic, muted paragraph */}
          <p className="text-sm italic text-gray-500">
            A smaller, italicized paragraph perfect for side notes or additional
            context.
          </p>

          {/* Centered paragraph with custom spacing */}
          <p className="text-center text-lg text-blue-600 tracking-wide">
            This centered paragraph uses blue text and wider letter spacing for
            visual interest.
          </p>

          {/* Justified paragraph with serif font */}
          <p className="text-justify font-serif text-gray-700">
            A justified paragraph using a serif font family, creating a more
            traditional and formal appearance.
          </p>

          {/* Condensed paragraph */}
          <p className="text-sm tracking-tight leading-snug text-gray-800">
            This paragraph uses tighter tracking and leading for a more
            condensed appearance, suitable for space-conscious designs.
          </p>

          {/* Highlighted paragraph */}
          <p className="bg-yellow-100 p-4 rounded-lg text-gray-700">
            A paragraph with a highlighted background, drawing attention to
            important content or announcements.
          </p>

          {/* Bordered paragraph */}
          <p className="border-l-4 border-green-500 pl-4 text-gray-600">
            This paragraph features a left border, commonly used for quotes or
            highlighted content sections.
          </p>

          {/* Large paragraph with custom line height */}
          <p className="text-2xl leading-loose text-purple-600">
            A large paragraph with generous line height, creating an airy and
            dramatic presentation.
          </p>

          {/* Modern mono paragraph */}
          <p className="font-mono text-sm text-gray-700 bg-gray-100 p-3 rounded">
            A monospace paragraph with a subtle background, perfect for
            technical content or code-related text.
          </p>

          {/* Gradient text paragraph */}
          <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            This paragraph uses a gradient text effect for a modern and
            eye-catching appearance.
          </p>

          {/* Uppercase paragraph */}
          <p className="uppercase tracking-widest text-sm text-gray-500">
            An uppercase paragraph with maximum tracking, ideal for headers or
            emphasis.
          </p>

          {/* Drop shadow paragraph */}
          <p className="text-xl font-bold text-indigo-600 drop-shadow-lg">
            A paragraph with a subtle drop shadow effect for depth and emphasis.
          </p>

          {/* Two-column paragraph */}
          <p className="columns-2 gap-8 text-gray-600">
            This is a longer paragraph split into two columns for better
            readability on wider screens. It contains enough text to demonstrate
            the column break effectively while maintaining a clean layout.
          </p>

          {/* Decorative paragraph */}
          <p className="text-center text-lg text-red-500 border-t border-b border-red-200 py-4">
            A decorative paragraph with top and bottom borders for special
            announcements or featured content.
          </p>

          {/* 1. Card component */}
          <div className="bg-white rounded-lg shadow-md p-6 max-w-sm">
            <h2 className="text-xl font-bold mb-4">Card Title</h2>
            <p className="text-gray-600">
              This is a simple card component with rounded corners and a shadow
              effect.
            </p>
          </div>

          {/* 2. Alert component */}
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-yellow-700">
                  Warning alert message goes here.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Badge component */}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            New Feature
          </span>

          {/* 4. Button group */}
          <div className="inline-flex rounded-md shadow-sm">
            <button className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100">
              Left
            </button>
            <button className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border-t border-b border-gray-200 hover:bg-gray-100">
              Middle
            </button>
            <button className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-100">
              Right
            </button>
          </div>

          {/* 5. Input field with label */}
          <div className="max-w-sm">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          {/* 6. Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full w-3/4"></div>
          </div>

          {/* 7. Navigation tabs */}
          <nav className="flex space-x-4 border-b border-gray-200">
            <button className="px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
              Active
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Tab 2
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Tab 3
            </button>
          </nav>

          {/* 2. Search input with icon */}
          <div className="max-w-md">
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Search..."
              />
              <div className="absolute left-3 top-2.5">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* 3. Stats card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <dl className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <dt className="text-sm font-medium text-gray-500">
                  Total Users
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  12.5k
                </dd>
              </div>
              <div className="text-center">
                <dt className="text-sm font-medium text-gray-500">Revenue</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  $45.8k
                </dd>
              </div>
              <div className="text-center">
                <dt className="text-sm font-medium text-gray-500">
                  Conversion
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  2.4%
                </dd>
              </div>
            </dl>
          </div>

          {/* 4. Toggle switch */}
          <div className="flex items-center">
            <button className="relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-gray-200">
              <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out"></span>
            </button>
            <span className="ml-3 text-sm font-medium text-gray-900">
              Notifications
            </span>
          </div>

          {/* 5. Testimonial card */}
          <div className="bg-white rounded-xl shadow-md p-6 max-w-xl">
            <div className="flex space-x-4">
              <div className="h-12 w-12 rounded-full bg-gray-200"></div>
              <div>
                <h4 className="text-lg font-bold">Jane Smith</h4>
                <p className="mt-1 text-gray-600">
                  Amazing product! Exactly what I needed.
                </p>
              </div>
            </div>
          </div>

          {/* 6. File upload */}
          <div className="max-w-xl">
            <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none hover:border-gray-400 focus:outline-none">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="text-gray-600">Drop files to upload</span>
              </div>
            </label>
          </div>

          {/* 7. Breadcrumb navigation */}
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <div className="flex items-center">
                  <span className="text-gray-600">Home</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-gray-600">Products</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* 8. Loading spinner */}
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          </div>

          {/* 9. Newsletter subscription */}
          <div className="bg-gray-100 p-6 rounded-lg max-w-md">
            <h3 className="text-lg font-medium text-gray-900">
              Subscribe to our newsletter
            </h3>
            <div className="mt-4 flex">
              <input
                type="email"
                className="flex-1 rounded-l-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>

          {/* 10. Feature list */}
          <div className="space-y-4 max-w-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Easy Integration
                </h3>
                <p className="mt-1 text-gray-500">
                  Simple and straightforward implementation process.
                </p>
              </div>
            </div>
          </div>

          {/* 11. Social share buttons */}
          <div className="flex space-x-4">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <svg
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Share
            </button>
          </div>

          {/* 12. Dropdown menu */}
          <div className="relative inline-block text-left">
            <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              Options
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* 13. Comment box */}
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl">
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              </div>
              <div className="min-w-0 flex-1">
                <textarea
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Add your comment..."
                ></textarea>
                <div className="mt-3 flex items-center justify-end">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 14. Error message */}
          <div className="rounded-md bg-red-50 p-4 max-w-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error occurred
                </h3>
                <p className="mt-2 text-sm text-red-700">
                  Please try again later.
                </p>
              </div>
            </div>
          </div>
    </Fragment>
  )
}

// does not work for printing
const PrintablePage = () => {
  const [pages, setPages] = useState<PageContent[]>([[]]);
  const contentRef = useRef<HTMLDivElement>(null);

  // A4 dimensions in pixels (assuming 96 DPI)
  const PAGE_WIDTH = 794; // 210mm
  const PAGE_HEIGHT = 1123; // 297mm
  const CONTENT_HEIGHT = PAGE_HEIGHT - 192; // Subtracting 2 inches (96 * 2) of padding

  useEffect(() => {
    const paginateContent = () => {
      const content = contentRef.current;
      if (!content) return;

      // Reset the content container's style to measure properly
      content.style.height = "auto";
      content.style.overflow = "visible";

      // Get all direct child elements
      const elements = Array.from(content.children) as PageElement[];
      const newPages: PageContent[] = [[]];
      let currentPage = 0;
      let currentHeight = 0;

      elements.forEach((element) => {
        const clone = element.cloneNode(true) as PageElement;
        // Create a temporary container to measure the element
        const tempContainer = document.createElement("div");
        tempContainer.appendChild(clone);
        tempContainer.style.visibility = "hidden";
        tempContainer.style.position = "absolute";
        tempContainer.style.width = `${PAGE_WIDTH - 192}px`; // Subtracting 2 inches padding
        document.body.appendChild(tempContainer);

        const elementHeight = tempContainer.offsetHeight;
        document.body.removeChild(tempContainer);

        // If adding this element would exceed page height, start a new page
        if (currentHeight + elementHeight > CONTENT_HEIGHT) {
          currentPage++;
          currentHeight = 0;
          newPages[currentPage] = [];
        }

        newPages[currentPage].push(element);
        currentHeight += elementHeight;
      });

      setPages(newPages);
    };

    // Add resize observer to handle dynamic content changes
    const resizeObserver = new ResizeObserver(() => {
      paginateContent();
    });

    const currentContent = contentRef.current;
    if (currentContent) {
      resizeObserver.observe(currentContent);
      paginateContent();
    }

    return () => {
      if (currentContent) {
        resizeObserver.disconnect();
      }
    };
  }, [CONTENT_HEIGHT]); // Added CONTENT_HEIGHT to dependencies

  /* const createPdf = async () => {
    const doc = new jsPDF();

    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
  } */

    // const createPdf = async () => {
    //   const doc = new jsPDF({
    //     orientation: "portrait",
    //     unit: "mm",
    //     format: "a4"
    //   });
  
    //   // Render PrintablePageContent to HTML string
    //   const contentHtml = ReactDOMServer.renderToString(<PrintablePageContent />);
      
    //   // Create a temporary container to hold the rendered HTML
    //   const tempContainer = document.createElement('div');
    //   tempContainer.innerHTML = contentHtml;
      
    //   // Extract text content while preserving some structure
    //   const extractText = (element) => {
    //     let text = '';
    //     Array.from(element.childNodes).forEach(node => {
    //       if (node.nodeType === Node.TEXT_NODE) {
    //         text += node.textContent + ' ';
    //       } else if (node.nodeType === Node.ELEMENT_NODE) {
    //         // Add line breaks for block elements
    //         const style = window.getComputedStyle(node);
    //         if (style.display === 'block') {
    //           text += '\\n';
    //         }
    //         text += extractText(node);
    //         if (style.display === 'block') {
    //           text += '\\n';
    //         }
    //       }
    //     });
    //     return text;
    //   };
  
    //   const textContent = extractText(tempContainer);
  
    //   // Configure PDF document
    //   doc.setFont("helvetica");
    //   doc.setFontSize(12);
  
    //   // Split text into lines that fit the page width
    //   const splitText = doc.splitTextToSize(textContent, 180); // 180mm width accounting for margins
      
    //   let yPos = 20; // Starting y position
    //   const lineHeight = 7; // Line height in mm
  
    //   // Add text line by line
    //   splitText.forEach(line => {
    //     if (yPos > 280) { // Check if we need a new page (A4 height is 297mm)
    //       doc.addPage();
    //       yPos = 20;
    //     }
    //     doc.text(line.trim(), 15, yPos);
    //     yPos += lineHeight;
    //   });
  
    //   doc.save("generated-document.pdf");
    // };


    const createPdf = async (): Promise<void> => {
      try {
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4"
        });
    
        // Define margins (1 inch = 25.4mm)
        const margin = {
          top: 25.4,
          right: 25.4,
          bottom: 25.4,
          left: 25.4
        };
    
        // Create a visible container with proper styling
        const contentContainer = document.createElement('div');
        // A4 width (210mm) minus 2-inch margins
        contentContainer.style.width = `${210 - (2 * 25.4)}mm`;
        contentContainer.style.padding = `${margin.top}mm ${margin.right}mm ${margin.bottom}mm ${margin.left}mm`;
        contentContainer.style.margin = '0 auto';
        contentContainer.style.background = 'white';
        contentContainer.style.position = 'fixed';
        contentContainer.style.top = '0';
        contentContainer.style.left = '0';
        contentContainer.style.zIndex = '9999';
        contentContainer.style.overflow = 'hidden';
        
        // Render the content
        const contentHtml = ReactDOMServer.renderToString(<PrintablePageContent />);
        contentContainer.innerHTML = contentHtml;
        
        document.body.appendChild(contentContainer);
    
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
    
          const canvas = await html2canvas(contentContainer, {
            scale: 6,
            useCORS: true,
            logging: true,
            width: contentContainer.offsetWidth,
            height: contentContainer.offsetHeight,
            allowTaint: true,
            backgroundColor: '#ffffff',
            imageTimeout: 30000,
            onclone: (clonedDoc) => {
              const clonedContent = clonedDoc.querySelector('div');
              if (clonedContent) {
                clonedContent.style.display = 'block';
              }
            }
          });
    
          const imgData = canvas.toDataURL('image/jpeg', 1.0);
    
          // Calculate dimensions with 1-inch margins
          const imgProps = doc.getImageProperties(imgData);
          const pdfWidth = doc.internal.pageSize.getWidth() - (2 * 25.4); // Subtract 2 inches
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
          // Add image to PDF with 1-inch margins
          doc.addImage(imgData, 'JPEG', margin.left, margin.top, pdfWidth, pdfHeight);
    
          // Handle multiple pages with consistent 1-inch margins
          let heightLeft = pdfHeight;
          let position = margin.top;
    
          while (heightLeft >= pdfHeight) {
            position = -pdfHeight + margin.top;
            doc.addPage();
            doc.addImage(imgData, 'JPEG', margin.left, position, pdfWidth, pdfHeight);
            heightLeft -= pdfHeight;
          }
    
          doc.save('generated-document.pdf');
    
        } finally {
          document.body.removeChild(contentContainer);
        }
    
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error generating PDF:', error.message);
        } else {
          console.error('Unknown error generating PDF:', error);
        }
        throw error;
      }
    };


  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <style>{`
        @page {
          size: A4;
          margin: 0;
        }

        @media print {
          body { margin: 0; padding: 0; }
          .print-container { background: none !important; }
          .page { page-break-after: always; }
          .page:last-child { page-break-after: auto; }
          .page-break { display: none !important; }
          .measurement-container { display: none !important; }
          .debug-info { display: none !important; }
        }

        @media screen {
          .page { margin-bottom: 2rem; }
          .page-break {
            width: 210mm;
            height: 40px;
            margin: 2rem auto;
            background: #f3f4f6;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6b7280;
            font-size: 14px;
            border-top: 2px dashed #d1d5db;
            border-bottom: 2px dashed #d1d5db;
          }
        }
      `}</style>

      {/* Hidden measurement container */}
      <div className="measurement-container fixed left-0 top-0 -z-50 opacity-0 pointer-events-none">
        <div ref={contentRef}>
          <PrintablePageContent />
        </div>
      </div>

      {/* Actual printed pages */}
      <div className="print-container">
        {pages.map((pageContent, pageIndex) => (
          <React.Fragment key={pageIndex}>
            <div className="page">
              <div
                className="bg-white shadow-lg"
                style={{
                  width: "210mm",
                  height: "297mm",
                  padding: "1in",
                  boxSizing: "border-box",
                }}
              >
                <div className="w-full h-full border border-dashed border-gray-300">
                  {pageContent.map((element, elementIndex) => (
                    <div
                      key={elementIndex}
                      dangerouslySetInnerHTML={{ __html: element.outerHTML }}
                    />
                  ))}
                </div>
              </div>
            </div>
            {pageIndex < pages.length - 1 && (
              <div className="page-break">Page Break</div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* <button onClick={generateDocx}>Generate DOCX</button> */}

      <DocxConverterButton contentRef={contentRef} />
      <button onClick={createPdf}>Create PDF</button>

      {/* Debug info */}
      <div className="debug-info fixed bottom-4 right-4 bg-white p-4 rounded shadow">
        Pages: {pages.length}
      </div>
    </div>
  );
};

// kinda works
// const PrintablePage = () => {
//   const [pages, setPages] = useState<PageContent[]>([[]]);
//   const contentRef = useRef<HTMLDivElement>(null);

//   // US Letter dimensions in pixels (assuming 96 DPI)
//   const PAGE_WIDTH = 816; // 8.5 inches * 96 DPI
//   const PAGE_HEIGHT = 1056; // 11 inches * 96 DPI
//   const CONTENT_HEIGHT = PAGE_HEIGHT - 192; // Subtracting 2 inches (96 * 2) of padding

//   useEffect(() => {
//     const paginateContent = () => {
//       const content = contentRef.current;
//       if (!content) return;

//       content.style.height = "auto";
//       content.style.overflow = "visible";

//       const elements = Array.from(content.children) as PageElement[];
//       const newPages: PageContent[] = [[]];
//       let currentPage = 0;
//       let currentHeight = 0;

//       elements.forEach((element) => {
//         const clone = element.cloneNode(true) as PageElement;
//         const tempContainer = document.createElement("div");
//         tempContainer.appendChild(clone);
//         tempContainer.style.visibility = "hidden";
//         tempContainer.style.position = "absolute";
//         tempContainer.style.width = `${PAGE_WIDTH - 192}px`;
//         document.body.appendChild(tempContainer);

//         const elementHeight = tempContainer.offsetHeight;
//         document.body.removeChild(tempContainer);

//         if (currentHeight + elementHeight > CONTENT_HEIGHT) {
//           currentPage++;
//           currentHeight = 0;
//           newPages[currentPage] = [];
//         }

//         newPages[currentPage].push(element);
//         currentHeight += elementHeight;
//       });

//       setPages(newPages);
//     };

//     const resizeObserver = new ResizeObserver(() => {
//       paginateContent();
//     });

//     const currentContent = contentRef.current;
//     if (currentContent) {
//       resizeObserver.observe(currentContent);
//       paginateContent();
//     }

//     return () => {
//       if (currentContent) {
//         resizeObserver.disconnect();
//       }
//     };
//   }, [CONTENT_HEIGHT]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
//       <style>{`
//         @page {
//           size: letter;
//           margin: 0;
//         }

//         @media print {
//           body { margin: 0; padding: 0; }
//           .print-container { background: none !important; }
//           .page { page-break-after: always; }
//           .page:last-child { page-break-after: auto; }
//           .page-break { display: none !important; }
//           .measurement-container { display: none !important; }
//           .debug-info { display: none !important; }
//         }

//         @media screen {
//           .page { margin-bottom: 2rem; }
//           .page-break {
//             width: 8.5in;
//             height: 40px;
//             margin: 2rem auto;
//             background: #f3f4f6;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: #6b7280;
//             font-size: 14px;
//             border-top: 2px dashed #d1d5db;
//             border-bottom: 2px dashed #d1d5db;
//           }
//         }
//       `}</style>

//       {/* Hidden measurement container */}
//       <div className="measurement-container fixed left-0 top-0 -z-50 opacity-0 pointer-events-none">
//         <div ref={contentRef}>
//           {/* Your existing content components */}
//           <PrintablePageContent />
//         </div>
//       </div>

//       {/* Hidden PDF container */}
//       <div className="fixed left-0 top-0 -z-50 opacity-0 pointer-events-none">
//         <div >
//           {pages.map((pageContent, pageIndex) => (
//             <div
//               key={pageIndex}
//               style={{
//                 width: "8.5in",
//                 minHeight: "11in",
//                 padding: "1in",
//                 boxSizing: "border-box",
//                 breakAfter: "page"
//               }}
//             >
//               {pageContent.map((element, elementIndex) => (
//                 <div
//                   key={elementIndex}
//                   dangerouslySetInnerHTML={{ __html: element.outerHTML }}
//                 />
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Visual preview container */}
//       <div className="print-container">
//         {pages.map((pageContent, pageIndex) => (
//           <React.Fragment key={pageIndex}>
//             <div className="page">
//               <div
//                 className="bg-white shadow-lg"
//                 style={{
//                   width: "8.5in",
//                   height: "11in",
//                   padding: "1in",
//                   boxSizing: "border-box",
//                 }}
//               >
//                 <div className="w-full h-full border border-dashed border-gray-300">
//                   {pageContent.map((element, elementIndex) => (
//                     <div
//                       key={elementIndex}
//                       dangerouslySetInnerHTML={{ __html: element.outerHTML }}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//             {/* {pageIndex < pages.length - 1 && (
//               <div className="page-break">Page Break</div>
//             )} */}
//           </React.Fragment>
//         ))}
//       </div>

//       <div className="debug-info fixed bottom-4 right-4 bg-white p-4 rounded shadow">
//         Pages: {pages.length}
//       </div>
//     </div>
//   );
// };

// const PrintablePage = () => {
//   const [pages, setPages] = useState<PageContent[]>([[]]);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

//   // US Letter dimensions in pixels (assuming 96 DPI)
//   const PAGE_WIDTH = 816; // 8.5 inches * 96 DPI
//   const PAGE_HEIGHT = 1056; // 11 inches * 96 DPI
//   const CONTENT_HEIGHT = PAGE_HEIGHT - 192; // Subtracting 2 inches (96 * 2) of padding

//   const exportPageToPDF = async (pageIndex: number) => {
//     const pageElement = pageRefs.current[pageIndex];
//     if (!pageElement) return;

//     try {

//       const opt = {
//         margin: 1,
//         filename: `page-${pageIndex + 1}.pdf`,
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: {
//           scale: 2,
//           letterRendering: true,
//         },
//         jsPDF: {
//           unit: 'in',
//           format: 'letter',
//           orientation: 'portrait'
//         }
//       };

//       // Clone the page element to remove UI elements
//       const cleanPageElement = pageElement.cloneNode(true) as HTMLElement;
//       // Remove the export button from the clone
//       const buttonElement = cleanPageElement.querySelector('.export-button');
//       if (buttonElement) {
//         buttonElement.remove();
//       }

//       await html2pdf().set(opt).from(cleanPageElement).save();
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     }
//   };

//   useEffect(() => {
//     const paginateContent = () => {
//       const content = contentRef.current;
//       if (!content) return;

//       content.style.height = "auto";
//       content.style.overflow = "visible";

//       const elements = Array.from(content.children) as PageElement[];
//       const newPages: PageContent[] = [[]];
//       let currentPage = 0;
//       let currentHeight = 0;

//       elements.forEach((element) => {
//         const clone = element.cloneNode(true) as PageElement;
//         const tempContainer = document.createElement("div");
//         tempContainer.appendChild(clone);
//         tempContainer.style.visibility = "hidden";
//         tempContainer.style.position = "absolute";
//         tempContainer.style.width = `${PAGE_WIDTH - 192}px`;
//         document.body.appendChild(tempContainer);

//         const elementHeight = tempContainer.offsetHeight;
//         document.body.removeChild(tempContainer);

//         if (currentHeight + elementHeight > CONTENT_HEIGHT) {
//           currentPage++;
//           currentHeight = 0;
//           newPages[currentPage] = [];
//         }

//         newPages[currentPage].push(element);
//         currentHeight += elementHeight;
//       });

//       setPages(newPages);
//       // Update the refs array to match the number of pages
//       pageRefs.current = new Array(newPages.length).fill(null);
//     };

//     const resizeObserver = new ResizeObserver(() => {
//       paginateContent();
//     });

//     const currentContent = contentRef.current;
//     if (currentContent) {
//       resizeObserver.observe(currentContent);
//       paginateContent();
//     }

//     return () => {
//       if (currentContent) {
//         resizeObserver.disconnect();
//       }
//     };
//   }, [CONTENT_HEIGHT]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       {/* Hidden measurement container */}
//       <div className="measurement-container fixed left-0 top-0 -z-50 opacity-0 pointer-events-none">
//         <div ref={contentRef}>
//           <PrintablePageContent />
//         </div>
//       </div>

//       {/* Visual preview container */}
//       <div className="print-container flex flex-col items-center">
//         {pages.map((pageContent, pageIndex) => (
//           <div
//             key={pageIndex}
//             className="relative mb-8"
//             ref={el => pageRefs.current[pageIndex] = el}
//           >
//             <div className="page">
//               <div
//                 className="bg-white shadow-lg relative"
//                 style={{
//                   width: "8.5in",
//                   height: "11in",
//                   padding: "1in",
//                   boxSizing: "border-box",
//                 }}
//               >
//                 <div className="w-full h-full border border-dashed border-gray-300">
//                   {pageContent.map((element, elementIndex) => (
//                     <div
//                       key={elementIndex}
//                       dangerouslySetInnerHTML={{ __html: element.outerHTML }}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Export button for each page */}
//             <button
//               onClick={() => exportPageToPDF(pageIndex)}
//               className="export-button absolute top-4 right-4 flex items-center gap-2"
//             >

//               Export Page {pageIndex + 1}
//             </button>
//           </div>

//         ))}
//       </div>

//       <div className="debug-info fixed bottom-4 right-4 bg-white p-4 rounded shadow">
//         Pages: {pages.length}
//       </div>
//     </div>
//   );
// };



// doesn't work with creating pdf
// const PrintablePage = () => {
//   const [pages, setPages] = useState<PageContent[]>([[]]);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

//   // US Letter dimensions in pixels (assuming 96 DPI)
//   const PAGE_WIDTH = 816; // 8.5 inches * 96 DPI
//   const PAGE_HEIGHT = 1056; // 11 inches * 96 DPI
//   const CONTENT_HEIGHT = PAGE_HEIGHT - 192; // Subtracting 2 inches (96 * 2) of padding

//   // const exportPageToPDF = async (pageIndex: number) => {
//   //   const pageElement = pageRefs.current[pageIndex]?.querySelector('.page-content');
//   //   if (!pageElement) return;

//   //   try {
//   //     // Create new PDF document
//   //     const pdf = new jsPDF({
//   //       unit: 'in',
//   //       format: 'letter',
//   //       orientation: 'portrait'
//   //     });

//   //     // Calculate dimensions
//   //     const pageWidth = 8.5;
//   //     const pageHeight = 11;
//   //     const margin = 1;
//   //     const contentWidth = pageWidth - (2 * margin);
//   //     const contentHeight = pageHeight - (2 * margin);

//   //     // Generate canvas from HTML content
//   //     const canvas = await html2canvas(pageElement, {
//   //       scale: 4,
//   //       useCORS: true,
//   //       logging: false,
//   //       width: contentWidth * 96,
//   //       height: contentHeight * 96,
//   //       windowWidth: contentWidth * 96,
//   //       windowHeight: contentHeight * 96,
//   //       x: 0,
//   //       y: 0,
//   //       scrollY: -window.scrollY,
//   //       scrollX: 0,
//   //       removeContainer: true
//   //     });

//   //     // Convert canvas to image
//   //     const imgData = canvas.toDataURL('image/jpeg', 1.0);

//   //     // Add image to PDF with proper positioning
//   //     pdf.addImage(imgData, 'JPEG',
//   //       margin,
//   //       margin,
//   //       contentWidth,
//   //       contentHeight,
//   //       '',
//   //       'SLOW'
//   //     );

//   //     // Save the PDF
//   //     pdf.save(`page-${pageIndex + 1}.pdf`);
//   //   } catch (error) {
//   //     console.error('Error generating PDF:', error);
//   //   }
//   // };

//   useEffect(() => {
//     const paginateContent = () => {
//       const content = contentRef.current;
//       if (!content) return;

//       content.style.height = "auto";
//       content.style.overflow = "visible";

//       const elements = Array.from(content.children) as PageElement[];
//       const newPages: PageContent[] = [[]];
//       let currentPage = 0;
//       let currentHeight = 0;

//       elements.forEach((element) => {
//         const clone = element.cloneNode(true) as PageElement;
//         const tempContainer = document.createElement("div");
//         tempContainer.appendChild(clone);
//         tempContainer.style.visibility = "hidden";
//         tempContainer.style.position = "absolute";
//         tempContainer.style.width = `${PAGE_WIDTH - 192}px`;
//         document.body.appendChild(tempContainer);

//         const elementHeight = tempContainer.offsetHeight;
//         document.body.removeChild(tempContainer);

//         if (currentHeight + elementHeight > CONTENT_HEIGHT) {
//           currentPage++;
//           currentHeight = 0;
//           newPages[currentPage] = [];
//         }

//         newPages[currentPage].push(element);
//         currentHeight += elementHeight;
//       });

//       setPages(newPages);
//       pageRefs.current = new Array(newPages.length).fill(null);
//     };

//     const resizeObserver = new ResizeObserver(() => {
//       paginateContent();
//     });

//     const currentContent = contentRef.current;
//     if (currentContent) {
//       resizeObserver.observe(currentContent);
//       paginateContent();
//     }

//     return () => {
//       if (currentContent) {
//         resizeObserver.disconnect();
//       }
//     };
//   }, [CONTENT_HEIGHT]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       {/* Hidden measurement container */}
//       <div className="measurement-container fixed left-0 top-0 -z-50 opacity-0 pointer-events-none">
//         <div ref={contentRef}>
//           <PrintablePageContent />
//         </div>
//       </div>

//       {/* Visual preview container */}
//       <div className="print-container flex flex-col items-center">
//         {pages.map((pageContent, pageIndex) => (
//           <div
//             key={pageIndex}
//             className="relative mb-8"
//             ref={(el) => (pageRefs.current[pageIndex] = el)}
//           >
//             <div
//               className="page bg-white shadow-lg mx-auto"
//               style={{
//                 width: "8.5in",
//                 height: "11in",
//               }}
//             >
//               <div
//                 className="page-content mx-auto"
//                 style={{
//                   padding: "1in",
//                   width: "100%",
//                   height: "100%",
//                   boxSizing: "border-box",
//                 }}
//               >
//                 <div className="w-full h-full">
//                   {pageContent.map((element, elementIndex) => (
//                     <div
//                       key={elementIndex}
//                       dangerouslySetInnerHTML={{ __html: element.outerHTML }}
//                       className="[&>*]:mb-4 last:[&>*]:mb-0"
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Export button for each page */}
//             <button
//               className="export-button absolute top-4 right-4 px-4 py-2 bg-blue-500 
//                        hover:bg-blue-600 text-white rounded-md flex items-center gap-2"
//             >
//               Export Page {pageIndex + 1}
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="debug-info fixed bottom-4 right-4 bg-white p-4 rounded shadow">
//         Pages: {pages.length}
//       </div>
//     </div>
//   );
// };

// this failed
// const PrintablePage = () => {
//   const [pages, setPages] = useState<PageContent[]>([[]]);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const pageRefs = useRef([]);

//   // US Letter dimensions in pixels (assuming 96 DPI)
//   const PAGE_WIDTH = 816; // 8.5 inches * 96 DPI
//   const PAGE_HEIGHT = 1056; // 11 inches * 96 DPI
//   const CONTENT_HEIGHT = PAGE_HEIGHT - 192; // Subtracting 2 inches (96 * 2) of padding

//   const generatePDF = async (pageIndex) => {
//     if (!pageRefs.current[pageIndex]) return;

//     try {
//       const pageElement = pageRefs.current[pageIndex];

//       const canvas = await html2canvas(pageElement, {
//         scale: 2,
//         useCORS: true,
//         logging: false,
//         width: 624,
//         height: 864,  // Exactly 9 inches worth of pixels
//         windowWidth: 624,
//         windowHeight: 864
//       });

//       const imgData = canvas.toDataURL('image/jpeg', 1.0);

//       const pdf = new jsPDF({
//         orientation: 'portrait',
//         unit: 'in',
//         format: 'letter'
//       });

//       pdf.addImage(imgData, 'JPEG', 1, 1, 6.5, 9, undefined, 'FAST');
//       pdf.save(`page-${pageIndex + 1}.pdf`);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     }
//   };

//   const generateAllPDFs = async () => {
//     for (let i = 0; i < pages.length; i++) {
//       await generatePDF(i);
//     }
//   };

//   const { toPDF, targetRef } = usePDF({
//     filename: 'page.pdf',
//     page: {
//       format: [8.5 * 96, 11 * 96],
//       margin: 96 // 1 inch margin
//     }
//   });

//   useEffect(() => {
//     const paginateContent = () => {
//       const content = contentRef.current;
//       if (!content) return;

//       content.style.height = "auto";
//       content.style.overflow = "visible";

//       const elements = Array.from(content.children) as PageElement[];
//       const newPages: PageContent[] = [[]];
//       let currentPage = 0;
//       let currentHeight = 0;

//       elements.forEach((element) => {
//         const clone = element.cloneNode(true) as PageElement;
//         const tempContainer = document.createElement("div");
//         tempContainer.appendChild(clone);
//         tempContainer.style.visibility = "hidden";
//         tempContainer.style.position = "absolute";
//         tempContainer.style.width = `${PAGE_WIDTH - 192}px`;
//         document.body.appendChild(tempContainer);

//         const elementHeight = tempContainer.offsetHeight;
//         document.body.removeChild(tempContainer);

//         if (currentHeight + elementHeight > CONTENT_HEIGHT) {
//           currentPage++;
//           currentHeight = 0;
//           newPages[currentPage] = [];
//         }

//         newPages[currentPage].push(element);
//         currentHeight += elementHeight;
//       });

//       setPages(newPages);
//     };

//     const resizeObserver = new ResizeObserver(() => {
//       paginateContent();
//     });

//     const currentContent = contentRef.current;
//     if (currentContent) {
//       resizeObserver.observe(currentContent);
//       paginateContent();
//     }

//     return () => {
//       if (currentContent) {
//         resizeObserver.disconnect();
//       }
//     };
//   }, [CONTENT_HEIGHT]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
//       <style>{`
//         @page {
//           size: letter;
//           margin: 0;
//         }

//         @media print {
//           body { margin: 0; padding: 0; }
//           .print-container { background: none !important; }
//           .page { page-break-after: always; }
//           .page:last-child { page-break-after: auto; }
//           .page-break { display: none !important; }
//           .measurement-container { display: none !important; }
//           .debug-info { display: none !important; }
//         }

//         @media screen {
//           .page { margin-bottom: 2rem; }
//           .page-break {
//             width: 8.5in;
//             height: 40px;
//             margin: 2rem auto;
//             background: #f3f4f6;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: #6b7280;
//             font-size: 14px;
//             border-top: 2px dashed #d1d5db;
//             border-bottom: 2px dashed #d1d5db;
//           }
//         }
//       `}</style>

//       {/* Hidden measurement container */}
//       <div className="measurement-container fixed left-0 top-0 -z-50 opacity-0 pointer-events-none">
//         <div ref={contentRef}>
//           {/* Your existing content components */}
//           <PrintablePageContent />
//         </div>
//       </div>

//       {/* Hidden PDF container */}
//       <div className="fixed left-0 top-0 -z-50 opacity-0 pointer-events-none">
//         <div>
//           {pages.map((pageContent, pageIndex) => (
//             <div
//               key={pageIndex}
//               style={{
//                 width: "8.5in",
//                 minHeight: "11in",
//                 padding: "1in",
//                 boxSizing: "border-box",
//                 breakAfter: "page"
//               }}
//             >
//               {pageContent.map((element, elementIndex) => (
//                 <div
//                   key={elementIndex}
//                   dangerouslySetInnerHTML={{ __html: element.outerHTML }}
//                 />
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* PDF Controls */}
//       <div className="fixed top-4 right-4 space-x-4">
//         <button
//           onClick={generateAllPDFs}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Download All PDFs
//         </button>
//         <button
//           onClick={() => toPDF()}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Download Combined PDF
//         </button>
//       </div>

//       {/* Visual preview container */}
//       <div className="print-container" ref={targetRef}>
//         {pages.map((pageContent, pageIndex) => (
//           <React.Fragment key={pageIndex}>
//             <div className="page relative">
//                               <div
//                 className="bg-white shadow-lg"
//                 style={{
//                   width: "8.5in",
//                   height: "11in",
//                   padding: "1in",
//                   boxSizing: "border-box",
//                 }}
//               >
//                 <div
//                   ref={el => pageRefs.current[pageIndex] = el}
//                   className="w-full h-full border border-dashed border-gray-300">
//                   {pageContent.map((element, elementIndex) => (
//                     <div
//                       key={elementIndex}
//                       dangerouslySetInnerHTML={{ __html: element.outerHTML }}
//                     />
//                   ))}
//                 </div>
//               </div>
//               <button
//                 onClick={() => generatePDF(pageIndex)}
//                 className="absolute top-2 right-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
//               >
//                 Download Page {pageIndex + 1}
//               </button>
//             </div>
//           </React.Fragment>
//         ))}
//       </div>

//       <div className="debug-info fixed bottom-4 right-4 bg-white p-4 rounded shadow">
//         Pages: {pages.length}
//       </div>
//     </div>
//   );
// };

export default PrintablePage;

// base reference page

// const Page = () => {
//   const [ref, { width, height }] = useMeasure();

//   useEffect(() => {
//     console.log(`width: ${width}, height: ${height}`);
//   }, [width, height]);

//   return (
//     // Body styles
//     <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
//       {/* A4 page container */}
//       <div
//         className="bg-white shadow-lg"
//         style={{
//           width: "210mm",
//           height: "297mm",
//           padding: "1in",
//           boxSizing: "border-box",
//         }}
//         ref={ref}
//       >
//         {/* Content area with dashed border */}
//         <div
//           className="w-full h-full border border-dashed border-gray-300"
//         //   ref={ref}
//         >
//           <h1 className="text-2xl font-bold mb-4">
//             A4 Page with 1-inch Margins
//           </h1>
//           <p className="text-gray-600">
//             This is a sample content area. The page follows A4 dimensions (210mm
//             × 297mm) with 1-inch margins on all sides.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
