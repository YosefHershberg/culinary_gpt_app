import { useEffect, useRef, useState } from 'react'
//@ts-expect-error
import html2pdf from 'html2pdf.js'
import { RecipeWithImage } from '@/lib/types';

type UseRecipePDFReturnType = {
    contentRef: React.LegacyRef<HTMLElement>
    generatePDF: () => void
    imageUrl: string | null
    recipe: RecipeWithImage
}

const useRecipePDFPage = (recipe: RecipeWithImage): UseRecipePDFReturnType => {
    const contentRef = useRef<HTMLElement | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (recipe.image_url && !recipe.image_url.startsWith("data:image")) {
            //TODO: Find a way of loading the image without using a hidden img tag
        } else {
            setImageUrl(recipe.image_url);
        }
    }, [recipe]);

    const generatePDF = async () => {
        html2pdf().from(contentRef.current).toContainer().toCanvas().toImg().save(recipe.recipe.title);
    };

    return {
        contentRef,
        generatePDF,
        imageUrl,
        recipe
    };
}

export default useRecipePDFPage