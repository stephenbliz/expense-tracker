import { useEffect, useRef } from "react";

const Transaction = ({transactions, getContent, handleScroll, handleDelete, retrieveCur, transRef}) => {
    // const transRef = useRef();

    const redStyle = {
        color: 'rgb(160, 4, 4)'
    }

    const greenStyle = {
        color: 'rgb(2, 69, 2)'
    }

    useEffect(()=>{
        const unsub = getContent();
        return ()=>{
            unsub;
        }
    }, [])

    useEffect(()=>{
        const unsub = handleScroll();
        return ()=>{
            unsub;
        }
    }, [transRef.current])

    return (
        <div className="transactionContainer">
            <h3 className='transHeading'>Transactions</h3>
            <div className="transWrapper">
                {transactions?.map((transaction)=>(
                    <div className='transaction' key={transaction.id} ref={transRef}>
                        <div className="icon" onClick={()=>handleDelete(transaction.id)}><strong>X</strong></div>
                        <div className="transName">{transaction.description}</div>
                        <div className="amoun transAmount" style={transaction.type === 'credit' ? greenStyle : redStyle}>{retrieveCur} {transaction.amount}</div>
                    </div>
                ))}
                {transactions?.length === 0 && <div><em>No transactions found...</em></div>}
            </div>
            
        </div>
    );
}
 
export default Transaction;