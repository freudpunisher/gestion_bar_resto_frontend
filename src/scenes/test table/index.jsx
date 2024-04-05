import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
  MRT_ToggleFiltersButton,
  MRT_ToggleFiltersButtonProps,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
} from 'material-react-table';
import { Box, Button, IconButton } from '@mui/material';
import { tokens } from "../../theme";
import {useTheme } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';
import { data } from './data';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import {PNG} from '../../assets/code-editor.png'
import '../test table/table.css';
import PrintIcon from '@mui/icons-material/Print';

const columnHelper = createMRTColumnHelper();

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    size: 40,
  }),
  columnHelper.accessor('firstName', {
    header: 'First Name',
    size: 120,
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    size: 120,
  }),
  columnHelper.accessor('company', {
    header: 'Company',
    size: 300,
  }),
  columnHelper.accessor('city', {
    header: 'City',
  }),
  columnHelper.accessor('country', {
    header: 'Country',
    size: 220,
  }),
];

const Example = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  function handlePrintTable(rows) {
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);
    console.log(rows, 'test table')
  
    // Generate a print-friendly HTML table structure
    const printTableHTML = `
      <table style="width: 100%; margin: 0 auto; border-collapse: collapse; justifyContent: center;  alignItems: center; ">
        <thead style="background-color:blue;">
          <tr>
            ${tableHeaders.map(header => `<th>${header}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
        </tr>
      </thead>
      <tbody>
        ${rows.map((row, index) => `
          <tr>
             ${Object.values(row.original).map(cell => `<td>${cell}</td>`).join('')}
          </tr>
        `).join('')}
        </tbody>
      </table>
    `;
    const tableStyles = `
  table {
    width: 50%;
    margin: 0 auto;
    border-collapse: collapse;
    background-color: #f2f2f2;
  }

  th {
    background-color: lightgray;
    padding: 8px;
  }

  td {
    padding: 8px;
  }
`;
  
    const printWindow = window.open('', '', 'width=800,height=600');
    window.document.write(printTableHTML);
    // printWindow.document.close();
    // printWindow.focus();
    window.print();
  }

  function handlePrintTable(rows) {
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);
    console.log(rows, 'test table')
    const totalRow = ['Total', 100, 200, 300];
    
    // Generate a print-friendly HTML table structure
    const printTableHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 70vh;">
    <div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <h2><FaPrint style="vertical-align: middle; margin-right: 5px;" />Table Title</h2>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            ${tableHeaders.map((header) => `<th style="border: 1px solid black; background-color: blue;">${header}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${rows.map((row, index) => `
            <tr>
              ${Object.values(row.original).map((cell) => `<td style="border: 1px solid black;">${cell}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>
  `;
    const tableStyles = `
  table {
    width: 50%;
    margin: 0 auto;
    border-collapse: collapse;
    background-color: #f2f2f2;
  }

  th {
    background-color: lightgray;
    padding: 8px;
  }

  td {
    padding: 8px;
  }
`;
  
    const printWindow = window.open('', '', 'width=800,height=1000');
    printWindow.document.write(printTableHTML);
    // printWindow.document.close();
    // printWindow.focus();
    printWindow.print();
  } 

  

  const handleExportRows = (rows) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const idTotal = tableData.reduce((total, row) => {
      const id = row[0]; // Assuming "id" is the first column (index 0)
      return total + id;
    }, 0);
    const totalRow = ['Total', '', '', '', idTotal];
    const modifiedTableData = [...tableData, totalRow];

    const tableHeaders = columns.map((c) => c.header);
    let tableWidth = 100; // Adjust this value based on your table's width
    let pageWidth = doc.internal.pageSize.width;
    let margin = (pageWidth - tableWidth) / 2;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.font = '24px "Material Icons"'; // Adjust the font size and font family as needed
        ctx.fillText('visibility', 0, 24); // Replace 'visibility' with the icon you want to use
    }

    const img = new Image();
    img.src = canvas.toDataURL('../../assets/code-editor.png');
    doc.addImage(img, 'PNG', 10, 10, 24, 24);

    doc.text('Your Table Title', 10, 20); // Adjust the x and y values as needed

    autoTable(doc, {
        startY: 50,
        theme:'plain', // Adjust the startY value to position the table below the title
        headStyles: {
            fillColor: [0, 128, 0], // RGB values for green
            textColor: [255, 255, 255], // White text for better contrast
        },
        bodyStyles: {
          textColor: 'black', // RGB values for blue
        },
        styles: {
          lineColor: [0, 0, 0], // Set the lineColor property to [0, 0, 0] for black border
          lineWidth: 0.2, // Set the desired width for the border lines
      },
        head: [tableHeaders],
        body: modifiedTableData,
        margin: { vertical: 100 },
        didDrawCell: (data) => {
          if (data && data.section === 'body' && data.row) {
            const { doc, row } = data;
            if (row.index === modifiedTableData.length - 1) {
              // Add custom styling for the "Total" row
              doc.setFont('helvetica', 'bold'); // Set the font style to bold
              doc.setFontSize(12);
              doc.setTextColor(0, 0, 0); // Set RGB values for black color
              doc.setFillColor(255, 255, 255); // Set RGB values for white background color
      
              // Calculate the position of the "Total" row
              const cellWidth = data.table.width / data.table.columns.length;
              const cellHeight = data.row.height;
              const textPos = {
                x: data.table.startX,
                y: data.row.y + cellHeight / 2 + doc.internal.getLineHeight() / 2 - 1,
              };
      
              // doc.rect(textPos.x, textPos.y, cellWidth, cellHeight, 'FD');
            }
          }
        },
    });

    doc.save('mrt-pdf-example.pdf');
  };

  function printData() {
    var divToPrint = document.getElementById("printTable");
    var newWin = window.open("");
    newWin.document.write('<html><head><title>Print</title></head><body>');
    newWin.document.write('<style>table {border-collapse: collapse; width: 100%;} th, td {border: 1px solid black; padding: 8px; text-align: left;}</style>');
    newWin.document.write(divToPrint.outerHTML);
    newWin.document.write('</body></html>');
    newWin.print();
    newWin.close();
}


  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          color='secondary'
          variant='contained'
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          variant={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected() ? 'contained' : 'outlined'}
          color='secondary'
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
        <Button
          // disabled={table.getRowModel().rows.length === 0}
          variant='contained'
          color='secondary'
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handlePrintTable(table.getRowModel().rows)}
          startIcon={<LocalPrintshopIcon />}
        >
          print
        </Button>
      </Box>
    ),
    muiTablePaperProps: {
      elevation: 0, //change the mui box shadow
      //customize paper styles
      sx: {
        borderRadius: '12',
        // border: '10px  #e0e0e0',
        width: '70%',
        border: '5px solid  #424040',
      },
    },
    muiTableHeadCellProps: {
      //simple styling with the `sx` prop, works just like a style prop in this example
      sx: {
        fontWeight: 'bold',
        fontSize: '20px',
        backgroundColor: colors.redAccent[700]
      },
    },
    muiTableBodyRowProps:{
      sx: {
        fontWeight: 'bold',
        // fontSize: '20px',
        // backgroundColor: colors.redAccent[700]
      },
    },
    muiTableBodyProps: {
      sx: {
        //stripe the rows, make odd rows a darker color
        '& td:nth-of-type(odd)': {
          backgroundColor: '#f5f5f5',
        },
      },
    },
    muiTableBodyCellProps: {
      sx: {
        borderRight: '2px solid #e0e0e0', //add a border between columns
      },
    },
    muiTableFooterRowProps:{
      sx:{
        backgroundColor: colors.redAccent[700]

      }
    },
    renderToolbarInternalActions: ({ table }) => (
      <Box>
        {/* add custom button to print table  */}
        <IconButton
          onClick={() => {
            handlePrintTable(table.getRowModel().rows)
          }}
        >
          <PrintIcon />
        </IconButton>
        {/* along-side built-in buttons in whatever order you want them */}
        <MRT_ToggleDensePaddingButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />
        <MRT_ToggleFiltersButton table={table} />

      </Box>
    ),

  });

  return (
  <Box sx={{
    marginTop:20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <MaterialReactTable table={table} />;
  </Box>
  )
};

export default Example;
