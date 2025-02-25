import PaymentsIcon from "@mui/icons-material/Payments";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Link from "next/link";
interface NotificationCardInterface {
  id: string;
  title: string;
  message: string;
  amount: number;
  category: string;
  link: string;
  createdAt: string;
}

interface NotificationCardProps {
  notification: NotificationCardInterface;
}
const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
}) => {
  return notification.link !== null ? (
    <Link
      href={notification.link}
      className=" w-full rounded-[5px] px-4 py-4 bg-[#252525]/80 flex flex-col"
    >
      <div className=" w-[100%] flex items-center gap-4">
        {notification.category === "TRANSAKSI" ? (
          <PaymentsIcon sx={{ color: "#ffffff" }} />
        ) : (
          <InfoOutlinedIcon sx={{ color: "#ffffff" }} />
        )}
        <div className=" flex flex-col gap-1">
          <h1 className="w-full text-left font-poppins font-bold text-base text-white">
            {notification.title}
          </h1>
          <p className="w-full text-left font-poppins text-[12px] text-white">
            {notification.message}
          </p>
          <div className=" flex items-center gap-1">
            <AccessTimeIcon sx={{ color: "#C4C4C4", fontSize: "12px" }} />
            <h1 className=" font-poppins text-xs text-white">
              {new Date(notification.createdAt).toLocaleString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </h1>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <div className=" w-full rounded-[5px] px-4 py-4 bg-[#252525]/80 flex flex-col">
      <div className=" w-[100%] flex items-center gap-4">
        {notification.category === "TRANSAKSI" ? (
          <PaymentsIcon sx={{ color: "#ffffff" }} />
        ) : (
          <InfoOutlinedIcon sx={{ color: "#ffffff" }} />
        )}
        <div className=" flex flex-col gap-1">
          <h1 className="w-full text-left font-poppins font-bold text-base text-white">
            {notification.title}
          </h1>
          <p className="w-full text-left font-poppins text-[12px] text-white">
            {notification.message}
          </p>
          <div className=" flex items-center gap-1">
            <AccessTimeIcon sx={{ color: "#C4C4C4", fontSize: "12px" }} />
            <h1 className=" font-poppins text-xs text-white">
              {new Date(notification.createdAt).toLocaleString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
