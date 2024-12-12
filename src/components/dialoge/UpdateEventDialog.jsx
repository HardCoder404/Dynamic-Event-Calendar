import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Space, TimePicker } from "antd";
import dayjs from "dayjs";

const UpdateEventDialog = ({
  isOpen,
  onClose,
  currentEvent,
  setCurrentEvent,
  handleUpdateEvent,
  loading,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <input
              type="text"
              value={currentEvent?.title || ""}
              onChange={(e) =>
                setCurrentEvent((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className="border-b w-full outline-none text-3xl border-gray-500"
              placeholder="Add a title"
            />
          </DialogTitle>
          <DialogDescription>
            <div className="mt-5">
              <h3 className="text-lg font-semibold mb-2">Choose Time:</h3>
              <Space direction="vertical" className="w-full">
                <TimePicker.RangePicker
                  className="w-full"
                  format="h:mm A"
                  value={
                    currentEvent?.startTime && currentEvent?.endTime
                      ? [
                          dayjs(currentEvent.startTime, "h:mm A"),
                          dayjs(currentEvent.endTime, "h:mm A"),
                        ]
                      : null
                  }
                  onChange={(value) => {
                    if (value) {
                      const [start, end] = value;
                      setCurrentEvent((prev) => ({
                        ...prev,
                        startTime: start.format("h:mm A"),
                        endTime: end.format("h:mm A"),
                      }));
                    }
                  }}
                />
              </Space>

              <h3 className="text-lg font-semibold mb-2 mt-8">
                Add Description (optional)
              </h3>
              <textarea
                className="border rounded-lg resize-none hide-scrollbar p-3 w-full h-32 outline-none text-lg border-gray-500"
                placeholder="Add a description..."
                value={currentEvent?.description || ""}
                onChange={(e) =>
                  setCurrentEvent((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              <Button
                onClick={() => handleUpdateEvent(currentEvent.id)}
                className="w-full rounded-2xl mt-5"
                disabled={
                  !currentEvent?.title ||
                  !currentEvent?.startTime ||
                  !currentEvent?.endTime
                }
              >
                {loading ? (
                  <div
                    className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full dark:text-white"
                    role="status"
                    aria-label="loading"
                  ></div>
                ) : (
                  "Update Event"
                )}
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEventDialog;
