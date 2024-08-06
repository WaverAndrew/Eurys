import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const exampleMessages = [
  {
    heading: "Who is a startup founder in my city?",
    message: "Who is a startup founder in my city?",
  },
  {
    heading: "Who is expert in retail sales?",
    message: "Who is expert in retail sales?",
  },
  {
    heading: "Who can I ask for advice in b2c marketing?",
    message: "Who can I ask for advice in b2c marketing?",
  },
];

const startupExampleMessages = [
  {
    heading: "Who is a startup founder?",
    message: "Who is a startup founder?",
  },
  {
    heading: "Who can I ask for advice in b2c marketing?",
    message: "Who can I ask for advice in b2c marketing?",
  },
  {
    heading: "Who can give me advice in medtech?",
    message: "Who can give me advice in medtech?",
  },
];
export function EmptyScreen({
  submitMessage,
  className,
}: {
  submitMessage: (message: string) => void;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-background p-2">
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {startupExampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              name={message.message}
              onClick={async () => {
                submitMessage(message.message);
              }}
            >
              <ArrowRight size={16} className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
