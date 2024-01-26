import { useEffect } from "react"

const Income = ({expenseCalc, expenses, incomeCalc, incomes, retrieveCur}) => {

    useEffect(()=>{
        const unsub1 = expenseCalc();
        const unsub2 = incomeCalc();
        return ()=>{
            unsub1;
            unsub2;
        }
    })

    return (
        <div className="incomeContainer">
            <div className="incomeWrapper wrps">
                <div className="income">Income</div>
                <div className="incomeAmount amount">{retrieveCur} {incomes}</div>
            </div>

            <div className="expenseWrapper wrps">
                <div className="expense">Expenses</div>
                <div className="expenseAmount amount">{retrieveCur} {expenses}</div>
            </div>
        </div>
    );
}
 
export default Income;
