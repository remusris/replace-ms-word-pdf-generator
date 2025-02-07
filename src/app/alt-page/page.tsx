"use client"

import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const PDFGenerator = () => {
  const generatePDF = async () => {
    const element = document.getElementById('content-to-convert');
    if (!element) return;

    try {
      // Create new PDF document
      const pdf = new jsPDF({
        unit: 'in',
        format: 'letter',
        orientation: 'portrait'
      });

      // Calculate dimensions
      const pageWidth = 8.5;
      const pageHeight = 11;
      const margin = 1;
      const contentWidth = pageWidth - (2 * margin);
      const contentHeight = pageHeight - (2 * margin);

      // Generate canvas from HTML content
      const canvas = await html2canvas(element, {
        scale: 4,
        useCORS: true,
        logging: false,
        width: contentWidth * 96,
        height: contentHeight * 96,
        windowWidth: contentWidth * 96,
        windowHeight: contentHeight * 96,
        x: 0,
        y: 0,
        scrollY: -window.scrollY, // Prevent scrolling offset
        scrollX: 0,
      });

      // Convert canvas to image
      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      // Add image to PDF with proper positioning
      pdf.addImage(imgData, 'JPEG', 
        margin,
        margin,
        contentWidth,
        contentHeight,
        '',
        'SLOW'
      );

      // Save the PDF
      pdf.save('document.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Content container with debug outline */}
      <div 
        id="content-to-convert" 
        className="relative w-[624px] h-[864px] mx-auto bg-white" // 6.5 x 9 inches at 96 DPI
        style={{
          border: '1px solid #E5E7EB',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Debug grid overlay */}
        <div className="absolute inset-0 pointer-events-none hidden debug-grid">
          <div className="border-t border-blue-200 w-full absolute top-0"></div>
          <div className="border-b border-blue-200 w-full absolute bottom-0"></div>
          <div className="border-l border-blue-200 h-full absolute left-0"></div>
          <div className="border-r border-blue-200 h-full absolute right-0"></div>
        </div>

        {/* Actual content */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Sample Document</h1>
          <p className="text-base">
            This is a sample document that will be converted to PDF with 1-inch margins 
            on all sides. The content area is 6.5 x 9 inches on a standard US Letter 
            size page (8.5 x 11 inches).
          </p>
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Document Features</h2>
            <ul className="list-disc pl-4 space-y-2">
              <li>Precise 1-inch margins</li>
              <li>High-quality text rendering</li>
              <li>Maintains formatting and styles</li>
              <li>Supports images and tables</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex justify-center gap-4">
        <button 
          onClick={generatePDF}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
        >
          Convert to PDF
        </button>
        <button 
          onClick={() => document.body.classList.toggle('show-debug')}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
        >
          Toggle Debug Grid
        </button>
      </div>

      {/* Debug styles */}
      <style jsx global>{`
        body.show-debug .debug-grid {
          display: block;
        }
      `}</style>
    </div>
  );
};

export default PDFGenerator;











































// "use client"

// import React from 'react';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';

// const PDFGenerator = () => {
//   const generatePDF = async () => {
//     const element = document.getElementById('content-to-convert');
//     if (!element) return;

//     try {
//       // Create new PDF document
//       const pdf = new jsPDF({
//         unit: 'in',
//         format: 'letter',
//         orientation: 'portrait'
//       });

//       // Calculate dimensions
//       const pageWidth = 8.5;
//       const pageHeight = 11;
//       const margin = 1;
//       const contentWidth = pageWidth - (2 * margin);
//       const contentHeight = pageHeight - (2 * margin);

//       // Generate canvas from HTML content
//       const canvas = await html2canvas(element, {
//         scale: 5,
//         useCORS: true,
//         logging: false,
//         width: contentWidth * 96,
//         height: contentHeight * 96,
//         windowWidth: contentWidth * 96,
//         windowHeight: contentHeight * 96,
//         x: 0,
//         y: 0,
//         scrollY: -window.scrollY, // Prevent scrolling offset
//         scrollX: 0,
//       });

//       // Convert canvas to image
//       const imgData = canvas.toDataURL('image/jpeg', 1.0);

//       // Add image to PDF with proper positioning
//       pdf.addImage(imgData, 'JPEG', 
//         margin,
//         margin,
//         contentWidth,
//         contentHeight,
//         '',
//         'SLOW'
//       );

//       // Save the PDF
//       pdf.save('document.pdf');
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       {/* Content container with debug outline */}
//       <div 
//         id="content-to-convert" 
//         className="relative w-[624px] h-[864px] mx-auto bg-white" // 6.5 x 9 inches at 96 DPI
//         style={{
//           border: '1px solid #E5E7EB',
//           boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
//         }}
//       >
//         {/* Debug grid overlay */}
//         <div className="absolute inset-0 pointer-events-none hidden debug-grid">
//           <div className="border-t border-blue-200 w-full absolute top-0"></div>
//           <div className="border-b border-blue-200 w-full absolute bottom-0"></div>
//           <div className="border-l border-blue-200 h-full absolute left-0"></div>
//           <div className="border-r border-blue-200 h-full absolute right-0"></div>
//         </div>

//         {/* Actual content */}
//         <div className="space-y-4">
//           <h1 className="text-2xl font-bold">Sample Document</h1>
//           <p className="text-base">
//             This is a sample document that will be converted to PDF with 1-inch margins 
//             on all sides. The content area is 6.5 x 9 inches on a standard US Letter 
//             size page (8.5 x 11 inches).
//           </p>
//           <div className="bg-gray-100 p-4 rounded">
//             <h2 className="text-xl font-semibold mb-2">Document Features</h2>
//             <ul className="list-disc pl-4 space-y-2">
//               <li>Precise 1-inch margins</li>
//               <li>High-quality text rendering</li>
//               <li>Maintains formatting and styles</li>
//               <li>Supports images and tables</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="mt-6 flex justify-center gap-4">
//         <button 
//           onClick={generatePDF}
//           className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
//         >
//           Convert to PDF
//         </button>
//         <button 
//           onClick={() => document.body.classList.toggle('show-debug')}
//           className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
//         >
//           Toggle Debug Grid
//         </button>
//       </div>

//       {/* Debug styles */}
//       <style jsx global>{`
//         body.show-debug .debug-grid {
//           display: block;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PDFGenerator;