import Card from "../Cards";
import { useDashboard } from "../../../context/DashboardContext";

const ChangeControl = () => {
  const { changeControl, loading } = useDashboard();

  return (
    <Card className="p-4">
      <h3 className="text-white font-bold mb-4">
        Change Control
      </h3>

      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : changeControl?.length > 0 ? (
        <div className="space-y-3 max-h-[300px] overflow-auto">
          {changeControl.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 p-3 rounded-lg"
            >
              {/* ID */}
              <div className="text-xs text-gray-400">
                ID: {item.id}
              </div>

              {/* DESCRIPTION */}
              <div className="text-white text-sm mt-1">
                {item.description}
              </div>

              {/* DATE */}
              <div className="text-xs text-gray-500 mt-1">
                {new Date(item.insert_time).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-400">No data</div>
      )}
    </Card>
  );
};

export default ChangeControl;