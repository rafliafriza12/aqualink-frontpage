import PaymentsIcon from "@mui/icons-material/Payments";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
interface Activity {
  id: string;
  title: string;
  message: string;
  amount: number;
  category: string;
  link: string;
  createdAt: string;
}

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <div className=" w-full py-1 bg-transparent flex justify-between items-center">
      <div className=" w-[100%] flex items-center gap-4">
        {activity.category === "TRANSAKSI" ? (
          <PaymentsIcon sx={{ color: "#ffffff" }} />
        ) : (
          <InfoOutlinedIcon sx={{ color: "#ffffff" }} />
        )}
        <div className=" flex flex-col gap-1">
          <h1 className="w-full text-left font-poppins font-bold text-base text-white">
            {activity.title}
          </h1>
          <p className="w-full text-left font-poppins text-[12px] text-white">
            {activity.message}
          </p>
          <div className=" flex items-center gap-1">
            <AccessTimeIcon sx={{ color: "#C4C4C4", fontSize: "12px" }} />
            <h1 className=" font-poppins text-xs text-white">
              {new Date(activity.createdAt).toLocaleString("id-ID", {
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
      {/* {activity.paymentStatus === "success" ? (
        <div className=" py-1 px-1 bg-[#51BF0F] font-montserrat font-bold text-[10px] w-[20%] rounded-[20px] text-center text-white">
          {activity.paymentStatus}
        </div>
      ) : activity.paymentStatus === "pending" ? (
        <div className=" py-1 px-1 bg-[#bfbc0f] font-montserrat font-bold text-[10px] w-[20%] rounded-[20px] text-center text-white">
          {activity.paymentStatus}
        </div>
      ) : (
        <div className=" py-1 px-1 bg-[#CD4141] font-montserrat font-bold text-[10px] w-[20%] rounded-[20px] text-center text-white">
          {activity.paymentStatus}
        </div>
      )} */}
    </div>
  );
};

export default ActivityCard;
