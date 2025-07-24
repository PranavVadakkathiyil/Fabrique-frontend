import { useEffect, useState } from 'react'
import BarChart from '../../components/charts/Barchart'
import Piechart from '../../components/charts/Piechart'
import DashboardCard from "../../components/DashboardCard"
import { CategoryCount } from '../../apis/productapi'
interface IPieChart {
  id: number;
  value: number;
  label: string;
}
const Dashboard = () => {
    const [pieChartData, setPieChartData] = useState<IPieChart[]>([]);
    const [totalorder, settotalorder] = useState(0)
    const [stock, setstock] = useState(0)
    const [totalEarnings, settotalEarnings] = useState(0)
    const [monthlyearnings, setmonthlyearnings] = useState([])
    const [avgrating, setavgrating] = useState(0)
    useEffect(() => {
      const categorycount=async()=>{
        try {
            const res = await CategoryCount()
            console.log(res.data.data);
            setstock(res.data.data.totalStock)
            settotalorder(res.data.data.totalOrders)
            settotalEarnings(res.data.data.totalEarnings)
            setmonthlyearnings(res.data.data.monthlyEarningsArray)
            setavgrating(res.data.data.avgReviewRating)
            

            const piedata = res.data.data.categoryCounts.map((item:any,index:number)=>({
                id:index,
                value:item.count,
                label:item._id


            })
            

            )
            setPieChartData(piedata)
            console.log(pieChartData);
            
            
        } catch (error) {
            console.log(error);
            
        }
      } 
      categorycount()
    }, [])
    




    const cardData = [
        { title: 'Total Earning', value: totalEarnings, borderColor: 'border-l-blue-500' },
        { title: 'Total Stocks', value:stock , borderColor: 'border-l-red-500' },
        { title: 'Total Orders', value: totalorder, borderColor: 'border-l-yellow-500' },
        { title: 'Average Review ⭐', value: avgrating, borderColor: 'border-l-green-500' },
    ];
    const BarChartData = monthlyearnings;
    //const PieChartData = [
    //    { id: 0, value: 25, label: 'series A' },
    //    { id: 1, value: 25, label: 'series B' },
    //    { id: 2, value: 20, label: 'series C' },
    //    { id: 3, value: 30, label: 'series D' },
    //];
    return (
        <div className="w-screen">
            <h2 className="text-2xl font-bold  p-4">Dashboard
            </h2>
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
                <p className="text-2xl font-bold  p-4">Earning </p>
                <BarChart chartdata={BarChartData} />
            </section>
            <section>
                <p className="text-2xl font-bold flex  p-4">Stocks</p>
                <Piechart PieChartData={pieChartData} />
                
            </section>
        </div>
    )
}

export default Dashboard