import { useRef } from 'react'
//@ts-expect-error
import html2pdf from 'html2pdf.js'

const useRecipePDFPage = () => {
    const contentRef = useRef<HTMLElement | null>(null);

    const generatePDF = async () => {
        html2pdf().from(contentRef.current).toContainer().toCanvas().toImg().save('recipe');
    };

    return { contentRef, generatePDF }
}

export default useRecipePDFPage