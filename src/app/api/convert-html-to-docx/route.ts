import HTMLtoDOCX from "html-to-docx";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { html } = await req.json();

    const header = "<p>Header: My React DOCX</p>";
    const footer = "<p>Footer: Page number {PAGE}</p>";

    const documentOptions = {
      title: "My React Document",
      subject: "Generated from React",
      creator: "html-to-docx",
      keywords: ["React", "DOCX", "html-to-docx"],
      font: "Arial",
      fontSize: 24,
      orientation: "portrait" as const,
      margins: {
        top: 1440,
        right: 1800,
        bottom: 1440,
        left: 1800,
      },
      pageNumber: true,
      footer: true,
    };

    const docxBuffer = await HTMLtoDOCX(
      html,
      header,
      documentOptions,
      footer
    );

    // Return the buffer as a Response with appropriate headers
    return new Response(docxBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename=ReactDocument.docx'
      },
    });
  } catch (error) {
    console.error('Error generating DOCX:', error);
    return NextResponse.json({ error: 'Failed to generate document' }, { status: 500 });
  }
}