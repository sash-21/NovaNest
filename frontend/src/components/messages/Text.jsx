import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../store/useConversation";

const Text = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();

    // Check if authUser is defined
    if (!authUser) {
        console.error("authUser is not defined");
        return null;
    }

    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture;
    const bubbleBgColor = fromMe ? "bg-black" : "bg-amber-500";
    const shakeClass = message.shouldShake ? "shake" : "";

    // Debugging logs
    console.log("authUser:", authUser);
    console.log("authUser._id:", authUser._id);
    console.log("message.senderId:", message.senderId);
    console.log("fromMe:", fromMe);
    console.log("profilePic:", profilePic);
    console.log("bubbleBgColor:", bubbleBgColor);

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Profile' src={profilePic} />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
        </div>
    );
};

export default Text;
