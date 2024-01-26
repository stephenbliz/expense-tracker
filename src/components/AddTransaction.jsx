

const AddTransaction = ({handleSubmit, addTrans, setAddTrans}) => {
   

    return (
        <div className="addTransContainer">
            <h3 className="transHeading">Add Transactions</h3>
            <form className="form" onSubmit={(e)=>handleSubmit(e)}>
                <input 
                    type="text" 
                    placeholder="Transaction name..."
                    value={addTrans.description}
                    onChange={(e)=> setAddTrans({...addTrans, description: e.target.value})}

                />
                <input 
                    type="number" 
                    placeholder="Transaction amount..."
                    value={addTrans.amount}
                    onChange={(e)=> setAddTrans({...addTrans, amount: e.target.value})}

                />
                <div className="selectWrp">
                    <div>Select transaction type:</div>

                    <select onChange={(e)=> setAddTrans({...addTrans, type: e.target.value})}>
                        <option value="credit">Income</option>
                        <option value="debit">Expenses</option>
                    </select>
                </div>
                <button type="submit" className="submit">Submit</button>
            </form>
        </div>
    );
}
 
export default AddTransaction;