interface Message {
    id: string;
    senderName:string;
    senderEmail: string;
    subject:string;
    message:string;
    date:string;
    read:boolean;
  }
  
  function formatDate(datetimeStr: string): string {
    const date = new Date(datetimeStr);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}/${month}/${day}`;
  }

function MessageViewPopup(props: {message:Message}) {

  return (
    <>
      <div className="p-6 bg-blue-50 w-[100%] h-[75%] overflow-hidden rounded-md font-medium text-slate-600">
        <div className="overflow-y-auto">
          <div className="py-1">{formatDate(props.message.date)}</div>
          <div className="py-1">{props.message.senderName}</div>
          <div className="py-1">{props.message.senderEmail}</div>
          <div className="py-1">{props.message.subject}</div>
          <div className="py-1 max-h-[300px] overflow-y-auto">
            {props.message.message}
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageViewPopup;
