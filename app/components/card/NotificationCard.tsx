interface NotificationCardInterface {
  title: string;
  description: string;
  category: string;
  status?: string;
  createdAt: string;
}

interface NotificationCardProps {
  notification: NotificationCardInterface;
}
const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
}) => {
  return (
    <div className=" w-full rounded-[5px] px-4 py-4 bg-[#414BF1]/25 flex flex-col">
      <div className="w-full">
        <h1
          className={`text-left font-montserrat font-bold ${
            notification?.status === "success"
              ? "text-[#3BA726]"
              : "text-[#D15050]"
          }`}
        >
          {notification?.title}
        </h1>
      </div>
      <div className=" w-full">
        <p className=" text-left text-[#060620]/50 font-inter text-[13px]">
          {notification?.description}
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
