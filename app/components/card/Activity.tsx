import PaymentsIcon from "@mui/icons-material/Payments";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
interface Activity {
  id: string;
  name: string;
  userId: string;
  amount: number;
  category: string;
  paymentStatus: string;
}

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <div className=" w-full py-1 bg-transparent flex justify-between items-center">
      <div className=" w-[70%] flex items-center gap-4">
        <PaymentsIcon sx={{ color: "#ffffff" }} />
        <div className=" flex flex-col">
          <h1 className="w-full text-left font-poppins font-medium text-base text-white">
            {activity.category}
          </h1>
          <div className=" flex items-center gap-1">
            <AccessTimeIcon sx={{ color: "#C4C4C4", fontSize: "12px" }} />
            <h1 className=" font-poppins text-xs text-white">8.29 PM</h1>
          </div>
        </div>
      </div>
      {activity.paymentStatus === "success" ? (
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
      )}
    </div>
  );
};

export default ActivityCard;
