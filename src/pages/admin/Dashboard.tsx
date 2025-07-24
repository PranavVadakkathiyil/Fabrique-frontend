import { useEffect, useState } from "react";
import Piechart from "../../components/charts/Piechart";
import BarChart from "../../components/charts/Barchart";
import DashboardCard from "../../components/DashboardCard";
import { StatusForAdmin } from "../../apis/productapi";

interface IPieChart {
  id: number;
  value: number;
  label: string;
}

const Dashboard = () => {
  const [pieChartData, setPieChartData] = useState<IPieChart[]>([]);
  const [totalorder, setTotalOrder] = useState(0);
  const [stock, setStock] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [monthlyEarnings, setMonthlyEarnings] = useState<number[]>([]);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await StatusForAdmin();
        const data = res.data.data;

        setStock(data.totalStock);
        setTotalOrder(data.totalOrders);
        setTotalEarnings(data.totalEarnings);
        setMonthlyEarnings(data.monthlyEarningsArray);
        setAvgRating(data.avgReviewRating);

        const pieData = data.categoryCounts.map((item: any, index: number) => ({
          id: index,
          value: item.count,
          label: item._id,
        }));
        setPieChartData(pieData);
      } catch (error) {
        console.error("Error loading admin stats", error);
      }
    };

    fetchStats();
  }, []);

  const cardData = [
    { title: "Total Earning", value: totalEarnings, borderColor: "border-l-blue-500" },
    { title: "Total Stocks", value: stock, borderColor: "border-l-red-500" },
    { title: "Total Orders", value: totalorder, borderColor: "border-l-yellow-500" },
    { title: "Average Review ⭐", value: avgRating, borderColor: "border-l-green-500" },
  ];

  // Optional static pie charts (mocked)
  //const PieChartData2 = [
  //  { id: 0, value: 35, label: "Defective" },
  //  { id: 1, value: 25, label: "Wrong Item" },
  //  { id: 2, value: 20, label: "Size Issue" },
  //  { id: 3, value: 15, label: "Late Delivery" },
  //  { id: 4, value: 5, label: "Others" },
  //];
  //const PieChartData3 = [
  //  { id: 0, value: 60, label: "Cash on Delivery" },
  //  { id: 1, value: 25, label: "UPI" },
  //  { id: 2, value: 10, label: "Credit Card" },
  //  { id: 3, value: 5, label: "Net Banking" },
  //];

  return (
    <div className="w-screen">
      <h2 className="text-2xl font-bold p-4">Dashboard</h2>

      <section className="grid sm:grid-cols-4 grid-cols-1 p-4 gap-6">
        {cardData.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            value={card.value}
            borderColor={card.borderColor}
          />
        ))}
      </section>

      <section>
        <p className="text-2xl font-bold p-4">Earning</p>
        <BarChart chartdata={monthlyEarnings} />
      </section>

      <section>
        <p className="text-2xl font-bold p-4">Stocks by Category</p>
        <div className="sm:flex">
          <Piechart PieChartData={pieChartData} />
          
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
