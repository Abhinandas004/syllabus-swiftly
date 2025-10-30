import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

interface PdfPreviewModalProps {
  open: boolean;
  onClose: () => void;
  pdfContent: string;
  title: string;
  onDownload: () => void;
}

export const PdfPreviewModal = ({ open, onClose, pdfContent, title, onDownload }: PdfPreviewModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center justify-between">
            <span>{title}</span>
            <div className="flex gap-2">
              <Button onClick={onDownload} variant="default" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button onClick={onClose} variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="px-6 pb-6 overflow-auto max-h-[calc(90vh-100px)]">
          <div className="bg-white text-black p-8 rounded-lg shadow-inner">
            <div dangerouslySetInnerHTML={{ __html: pdfContent }} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
