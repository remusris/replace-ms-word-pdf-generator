// "use client";
// import { Page, Text, View, Document, StyleSheet, PDFViewer } from "@react-pdf/renderer";

// // Create styles for PDF
// const styles = StyleSheet.create({
//   page: {
//     padding: 30,
//     backgroundColor: "#ffffff",
//   },
//   text: {
//     marginBottom: 10,
//     fontSize: 12,
//   },
//   heading: {
//     fontSize: 20,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
//   card: {
//     padding: 15,
//     marginBottom: 15,
//     backgroundColor: "#f8f9fa",
//     borderRadius: 4,
//   },
//   alert: {
//     padding: 15,
//     marginBottom: 15,
//     backgroundColor: "#fff3cd",
//     borderRadius: 4,
//   },
//   badge: {
//     padding: "4 8",
//     backgroundColor: "#e3f2fd",
//     borderRadius: 12,
//     fontSize: 10,
//     alignSelf: "flex-start",
//   },
//   statsCard: {
//     padding: 15,
//     marginBottom: 15,
//     backgroundColor: "#ffffff",
//     borderRadius: 4,
//   },
//   statsGrid: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   statItem: {
//     alignItems: "center",
//   },
//   statValue: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   statLabel: {
//     fontSize: 10,
//     color: "#6b7280",
//   },
// });

// // Convert your PrintablePageContent to PDF format
// const PrintablePDF = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       {/* Standard paragraphs */}
//       <Text style={styles.text}>
//         This is a standard paragraph with comfortable line height and a subtle
//         gray color for easy reading.
//       </Text>

//       <Text style={[styles.text, { fontSize: 16, fontWeight: "bold" }]}>
//         Here&apos;s a larger, bolder paragraph that demands attention and emphasizes
//         important information.
//       </Text>


//       {/* Card Component */}
//       <View style={styles.card}>
//         <Text style={styles.heading}>Card Title</Text>
//         <Text style={styles.text}>
//           This is a simple card component with rounded corners and a shadow
//           effect.
//         </Text>
//       </View>

//       {/* Alert Component */}
//       <View style={styles.alert}>
//         <Text style={styles.text}>Warning alert message goes here.</Text>
//       </View>

//       {/* Badge Component */}
//       <View style={styles.badge}>
//         <Text>New Feature</Text>
//       </View>

//       {/* Stats Card */}
//       <View style={styles.statsCard}>
//         <View style={styles.statsGrid}>
//           <View style={styles.statItem}>
//             <Text style={styles.statValue}>12.5k</Text>
//             <Text style={styles.statLabel}>Total Users</Text>
//           </View>
//           <View style={styles.statItem}>
//             <Text style={styles.statValue}>$45.8k</Text>
//             <Text style={styles.statLabel}>Revenue</Text>
//           </View>
//           <View style={styles.statItem}>
//             <Text style={styles.statValue}>2.4%</Text>
//             <Text style={styles.statLabel}>Conversion</Text>
//           </View>
//         </View>
//       </View>
//     </Page>
//   </Document>
// );

// // Create a viewer component
// const PDFView = () => (
//     <PDFViewer style={{
//       width: '100%',
//       height: '100vh',

//     }}>
//       <PrintablePDF />
//     </PDFViewer>
//   );

// // Create a viewer component
// // Example usage in your app:
// const App = () => {
//     /* const handleDownload = async () => {
//       const blob = await generatePDF();
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = 'document.pdf';
//       link.click();
//       URL.revokeObjectURL(url);
//     }; */
  
//     return (
//       <div>
//         {/* Preview the PDF */}
//         <PDFView />
        
//         {/* Or add a download button */}
//         {/* <button onClick={handleDownload}>
//           Download PDF
//         </button> */}
//       </div>
//     );
//   };
  


// export default App;



"use client";
import { Page, Text, View, Document, StyleSheet, PDFViewer } from "@react-pdf/renderer";


// Define the style types
type StyleType = {
    page: {
      padding: number;
      backgroundColor: string;
      margin: number;
    };
    text: {
      marginBottom: number;
      fontSize: number;
    };
    heading: {
      fontSize: number;
      marginBottom: number;
      fontWeight: "bold";
    };
    card: {
      padding: number;
      marginBottom: number;
      backgroundColor: string;
      borderRadius: number;
    };
    alert: {
      padding: number;
      marginBottom: number;
      backgroundColor: string;
      borderRadius: number;
    };
    badge: {
      padding: string;
      backgroundColor: string;
      borderRadius: number;
      fontSize: number;
      alignSelf: "flex-start";
    };
    statsCard: {
      padding: number;
      marginBottom: number;
      backgroundColor: string;
      borderRadius: number;
    };
    statsGrid: {
      flexDirection: "row";
      justifyContent: "space-between";
      marginTop: number;
    };
    statItem: {
      alignItems: "center";
    };
    statValue: {
      fontSize: number;
      fontWeight: "bold";
      marginBottom: number;
    };
    statLabel: {
      fontSize: number;
      color: string;
    };
    table: {
      display: "flex" | "none";
      width: "auto" | string;
      borderStyle: "solid" | "dashed" | "dotted";
      borderWidth: number;
      borderRightWidth: number;
      borderBottomWidth: number;
    };
    tableRow: {
      margin: "auto" | string;
      flexDirection: "row";
    };
    tableCol: {
      width: string;
      borderStyle: "solid" | "dashed" | "dotted";
      borderWidth: number;
      borderLeftWidth: number;
      borderTopWidth: number;
    };
    tableCell: {
      margin: "auto" | string;
      padding: number;
    };
  };
  
  // Create styles for PDF
  const styles = StyleSheet.create<StyleType>({
    page: {
      padding: 72,
      backgroundColor: "#ffffff",
      margin: 0
    },
    text: {
      marginBottom: 10,
      fontSize: 12,
    },

    heading: {
      fontSize: 20,
      marginBottom: 10,
      fontWeight: "bold",
    },
    card: {
      padding: 15,
      marginBottom: 15,
      backgroundColor: "#f8f9fa",
      borderRadius: 4,
    },
    alert: {
      padding: 15,
      marginBottom: 15,
      backgroundColor: "#fff3cd",
      borderRadius: 4,
    },
    badge: {
      padding: "4 8",
      backgroundColor: "#e3f2fd",
      borderRadius: 12,
      fontSize: 10,
      alignSelf: "flex-start",
    },
    statsCard: {
      padding: 15,
      marginBottom: 15,
      backgroundColor: "#ffffff",
      borderRadius: 4,
    },
    statsGrid: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    statItem: {
      alignItems: "center",
    },
    statValue: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 5,
    },
    statLabel: {
      fontSize: 10,
      color: "#6b7280",
    },
    table: {
      display: "flex" as const,
      width: "auto" as const,
      borderStyle: "solid" as const,
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: "auto" as const,
      flexDirection: "row" as const,
    },
    tableCol: {
      width: "33.33%",
      borderStyle: "solid" as const,
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      margin: "auto" as const,
      padding: 5,
    },
  });
  
  // Convert your PrintablePageContent to PDF format
  const PrintablePDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Standard paragraphs */}
        <Text style={styles.text}>
          This is a standard paragraph with comfortable line height and a subtle
          gray color for easy reading.
        </Text>
  
        <Text style={[styles.text, { fontSize: 16, fontWeight: "bold" }]}>
          Here&apos;s a larger, bolder paragraph that demands attention and emphasizes
          important information.
        </Text>
  
        {/* Card Component */}
        <View style={styles.card}>
          <Text style={styles.heading}>Card Title</Text>
          <Text style={styles.text}>
            This is a simple card component with rounded corners and a shadow
            effect.
          </Text>
        </View>
  
        {/* Alert Component */}
        <View style={styles.alert}>
          <Text style={styles.text}>Warning alert message goes here.</Text>
        </View>
  
        {/* Badge Component */}
        <View style={styles.badge}>
          <Text>New Feature</Text>
        </View>
  
        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12.5k</Text>
              <Text style={styles.statLabel}>Total Users</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>$45.8k</Text>
              <Text style={styles.statLabel}>Revenue</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2.4%</Text>
              <Text style={styles.statLabel}>Conversion</Text>
            </View>
          </View>
        </View>
  
        {/* Table Component */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>2</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>3</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>4</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>5</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>6</Text>
            </View>
          </View>
        </View>




            {/* Standard paragraphs */}
            <Text style={styles.text}>
          This is a standard paragraph with comfortable line height and a subtle
          gray color for easy reading.
        </Text>
  
        <Text style={[styles.text, { fontSize: 16, fontWeight: "bold" }]}>
          Here&apos;s a larger, bolder paragraph that demands attention and emphasizes
          important information.
        </Text>
  
        {/* Card Component */}
        <View style={styles.card}>
          <Text style={styles.heading}>Card Title</Text>
          <Text style={styles.text}>
            This is a simple card component with rounded corners and a shadow
            effect.
          </Text>
        </View>
  
        {/* Alert Component */}
        <View style={styles.alert}>
          <Text style={styles.text}>Warning alert message goes here.</Text>
        </View>
  
        {/* Badge Component */}
        <View style={styles.badge}>
          <Text>New Feature</Text>
        </View>
  
        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12.5k</Text>
              <Text style={styles.statLabel}>Total Users</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>$45.8k</Text>
              <Text style={styles.statLabel}>Revenue</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2.4%</Text>
              <Text style={styles.statLabel}>Conversion</Text>
            </View>
          </View>
        </View>
  
        {/* Table Component */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>2</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>3</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>4</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>5</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>6</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
  
  // Create a viewer component
  const PDFView = () => (
    <PDFViewer style={{
      width: '100%',
      height: '100vh',
    }}>
      <PrintablePDF />
    </PDFViewer>
  );
  
  // Example usage in your app
  const App = () => {
    return (
      <div>
        <PDFView />
      </div>
    );
  };
  
  export default App;