import { Button, Typography } from "antd";
import { Calculator as CalculatorIcon } from "lucide-react";
import {
  useCreateRandomSession,
  useIsTogether,
  useJoinUrl,
  useLeaveSession,
} from "react-together";

export function Header() {
  const isTogether = useIsTogether();
  const leaveSession = useLeaveSession();
  const createRandomSession = useCreateRandomSession();
  const joinUrl = useJoinUrl();

  return (
    <div className="text-center mb-12">
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <CalculatorIcon className="h-10 w-10 text-blue-600" />
          Collaborative Investment Simulator
        </h1>
        <p className="mt-2 text-xl text-gray-600">
          Plan your financial future... Together!
        </p>
      </div>
      {isTogether ? (
        <>
          <p className="mt-2 text-gray-600">
            Invite your friends to this session with the link below:
          </p>
          <p className="mt-2 text-sm max-w-[20rem] mx-auto">
            <Typography.Link
              href={joinUrl!}
              target="_blank"
              rel="noopener noreferrer"
              copyable={true}
              ellipsis={{
                tooltip: true,
              }}
            >
              {joinUrl}
            </Typography.Link>
          </p>
          <div className="mt-2">
            <Button color="danger" variant="filled" onClick={leaveSession}>
              Leave Session
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-2 text-gray-600">
            Want to collaborate with your friends?
          </p>
          <Button
            color="primary"
            variant="filled"
            onClick={createRandomSession}
          >
            Start a Session!!
          </Button>
        </>
      )}
    </div>
  );
}
