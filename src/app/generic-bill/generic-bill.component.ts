import { Component, ElementRef, ViewChild } from '@angular/core';
import { Callbacks } from 'jquery';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-generic-bill',
  templateUrl: './generic-bill.component.html',
  styleUrls: ['./generic-bill.component.scss']
})
export class GenericBillComponent {

  @ViewChild('contentForPdf', {static: false }) el !: ElementRef

  generatePDF() {
    const doc = new jsPDF();
  
    const pdfContent = document.getElementById('contentForPdf');

    if (pdfContent instanceof HTMLElement) {
      html2canvas(pdfContent).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // PDF page width
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        doc.save('output.pdf');
      });
    } else {
      console.error(`Element with ID ${pdfContent} not found.`);
    }
  
    // if (pdfContent instanceof HTMLElement) {
    //   html2canvas(pdfContent).then((canvas) => {
    //     // Rest of the code

    //     html2canvas(pdfContent).then((canvas) => {
    //       const imgData = canvas.toDataURL('image/png');
    //       const imgWidth = 210; // PDF page width
    //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
    //       doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    //       doc.save('output.pdf');
    //     });
    //   });
    // } else {
    //   console.error("Element with ID 'pdfContent' not found.");
    // }
    
  }

  // generatePDF() {
  //   const doc = new jsPDF();
  
  //   const specialElementHandlers = {
  //     '#editor': function (element, renderer) {
  //       return true;
  //     }
  //   };
  
  //   const htmlContent = document.getElementById('pdfContent')?.innerHTML;
  
  //   doc.fromHTML(htmlContent, 15, 15, {
  //     width: 190,
  //     elementHandlers: specialElementHandlers
  //   });
  
  //   doc.save('output.pdf');
  // }

  // makePdf(){
  //   let pdf= new jsPDF('p', 'pt', 'a4');
  //   pdf.html(this.el.nativeElement , {
  //     callback: (pdf)=>{

  //       // save the pdf
  //       pdf.save("demoForHtml.pdf");
  //     }
  //   })
  // }

  // makePdf(): void {
  //   const pdf = new jsPDF('p', 'pt', 'a4');
  //   const options = {
  //     pagesplit: true,
  //     background: '#fff',
  //     scale: 0.7,
  //     html2canvas: {
  //       useCORS: true,
  //       logging: true,
  //       scrollY: -window.scrollY,
  //       scale: 1
  //     }
  //   };

  //   const content = this.el.nativeElement;
  //   pdf.html(content, options).then(() => {
  //     pdf.save('demoForHtml.pdf');
  //   });
  // }
  makePdf(): void {
    const pdf = new jsPDF('p', 'px', 'a4');
    const options = {
      pagesplit: false,
      background: '#fff',
      scale: .5, // Adjust the scale value as needed
      html2canvas: {
        useCORS: true,
        logging: true,
        scrollY: -window.scrollY,
        scale: 2
      }
    };

    const content = this.el.nativeElement;
    pdf.html(content, options).then(() => {
      pdf.save('demoForHtml.pdf');
    });
  }
}
