import AddTransaction from "./components/AddTransaction"
import Balance from "./components/Balance"
import Income from "./components/Income"
import Transaction from "./components/Transaction"
import { useState, useRef } from "react"


function App() {

  const [addTrans, setAddTrans] = useState({
    description: '',
    amount: '',
    type: 'credit'
  });

  const [transactions, setTransactions] = useState(null);
  const [expenses, setExpenses] = useState(0);
  const [incomes, setIncomes] = useState(0);
  const [balance, setBalance] = useState(0);
  const [currency, setCurrency] = useState('');
  const [retrieveCur, setRetrieveCur] = useState(localStorage.getItem('currency') || "$");
  const transRef = useRef();

  const getContent = async ()=>{
    const get = await JSON.parse(localStorage.getItem('data')) || [];
    setTransactions(get);
  }

  const handleScroll = () => {
    if(transRef.current){
        transRef.current.scrollIntoView({behaviour: 'smooth', block: 'start'})
    }
}

  const handleCurrency = (currency) => {
    localStorage.setItem('currency', currency);
    const newCur = localStorage.getItem('currency');
    setRetrieveCur(newCur);
    
  }

  const expenseCalc = async () => {
    const expense = await transactions?.reduce((acc, curr)=>{
        if(curr.type === 'debit'){
            return Number(acc) + Number(curr.amount)
        }
        return acc;
    }, 0)
    setExpenses(expense)
}

  const incomeCalc = async () => {
    const income = await transactions?.reduce((acc, curr)=>{
        if(curr.type === 'credit'){
            return Number(acc) + Number(curr.amount)
        }
        return acc;
    }, 0)
    setIncomes(income)
  }

  const balanceCalc = () => {
    const bal = incomes - expenses
    setBalance(bal);
  }

  const handleDelete = (id) => {

    const deleted = transactions.filter((transaction)=>{
      if(id !== transaction.id){
        return transaction
      }
    })
    
    localStorage.setItem('data', JSON.stringify(deleted));

    const retrieved = JSON.parse(localStorage.getItem('data'));

    setTransactions(retrieved)
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const content = {
        description: addTrans.description,
        amount: addTrans.amount,
        type: addTrans.type,
        id: Math.random(10000)
    }

    const existingContent = await JSON.parse(localStorage.getItem('data')) || []
    existingContent.push(content);

    const data =  JSON.stringify(existingContent);
    localStorage.setItem('data', data);
    getContent();
    expenseCalc();
    incomeCalc();
    balanceCalc();
    setAddTrans({description: '', amount: '', type: addTrans.type});
}
  
  return (
    <section className="section">
      <Balance 
        balance={balance} 
        balanceCalc={balanceCalc} 
        currency={currency} 
        setCurrency={setCurrency} 
        handleCurrency={handleCurrency} 
        retrieveCur={retrieveCur}
      />

      <Income 
        expenseCalc={expenseCalc} 
        retrieveCur={retrieveCur} 
        expenses={expenses} 
        incomeCalc={incomeCalc} 
        incomes={incomes}
      />

      <Transaction 
        transactions={transactions} 
        retrieveCur={retrieveCur} 
        getContent={getContent} 
        handleDelete={handleDelete}
        transRef={transRef}
        handleScroll={handleScroll}
      />

      <AddTransaction 
        handleSubmit={handleSubmit} 
        addTrans={addTrans} 
        setAddTrans={setAddTrans}
      />
    </section>
  )
}

export default App
