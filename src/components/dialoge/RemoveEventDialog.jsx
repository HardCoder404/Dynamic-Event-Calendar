import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const RemoveEventDialog = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure to delete?</DialogTitle>
          <div className="flex gap-3 justify-end pt-5">
            <Button variant="outline" onClick={onClose}>
              No
            </Button>
            <Button onClick={onConfirm}>Yes</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveEventDialog;
