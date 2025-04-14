import React, { useEffect, useState } from 'react'
import { prepareExpenseLineChart } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({transactions, onAddExpense}) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareExpenseLineChart(transactions);
        setChartData(result)
    }, [transactions])
  
    return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <h5 className='text-lg'>Expense overiew</h5>
                <p className='text-xs text-gray-400 mt-0.5'>Track your Spending trends over time and gain insights over your money goals.</p>
            </div>
            <button  className='add-btn' onClick={onAddExpense}>
                <LuPlus  className=''/>
                Add Expense
            </button>
        </div>
        <div className='mt-10'>
            <CustomLineChart data={chartData}/>
        </div>
    </div>
  )
}

export default ExpenseOverview