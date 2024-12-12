import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Import Dialog components
import { TimePicker } from "antd"; // Example time picker, adjust if using another library
import { Button } from "@/components/ui/button";

export default function CreateEventDialog({
  isDialogOpen,
  setIsDialogOpen,
  title,
  setTitle,
  timeRange,
  setTimeRange,
  description,
  setDescription,
  handleCreateEvent,
  isButtonDisabled,
  loading,
}) {
  return (
    isDialogOpen && (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-b w-full outline-none text-3xl border-gray-500"
                placeholder="Add a title"
              />
            </DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <h3 className="text-lg font-semibold mb-2">Choose Time:</h3>
                <TimePicker.RangePicker
                  className="w-full"
                  format="h:mm A"
                  onChange={setTimeRange} // Update time range state
                  value={timeRange ? [timeRange[0], timeRange[1]] : null}
                />

                <h3 className="text-lg font-semibold mb-2 mt-8">
                  Add Description (optional)
                </h3>
                <textarea
                  className="border rounded-lg resize-none hide-scrollbar p-3 w-full h-32 outline-none text-lg border-gray-500"
                  placeholder="Add a description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                  onClick={handleCreateEvent}
                  className="w-full rounded-2xl mt-5"
                  disabled={isButtonDisabled} // Disable button if inputs are incomplete
                >
                  {loading ? (
                    <div
                      className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent rounded-full text-white"
                      role="status"
                      aria-label="loading"
                    />
                  ) : (
                    "Create Event"
                  )}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  );
}
