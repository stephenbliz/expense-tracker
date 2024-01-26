import { useEffect} from "react";

const Balance = ({balance, balanceCalc, setCurrency, handleCurrency, retrieveCur, currency}) => {


    useEffect(()=>{
        const unsub = balanceCalc();
        return()=>{
            unsub;
        }

    })

    return (
        <>
            <div className="currencyWrp selectWrp">
                <div>Currency:</div>
                <select 
                    onChange={(e)=> {
                        setCurrency(e.target.value);
                    }} 
                    value={currency}
                > 
                    <option value="">Select an option</option>
                    <option value="&#8371;">Austral</option>
                    <option value="&#8383;">Bitcoin</option>
                    <option value="&#8373;">Cedi</option>
                    <option value="&#36;">Dollar</option>
                    <option value="&#8364;">Euro</option>
                    <option value="&#8355;">Franc</option>
                    <option value="&#x20B9;">Indian rupee</option>
                    <option value="&#8356;">Lira</option>
                    <option value='&#8358;'>Naira</option>
                    <option value="&#8369;">Peso</option>
                    <option value="&#163;">Pounds</option>
                    <option value="&#8360;">Rupee</option>
                    <option value="&#8381;">Ruble</option>
                    <option value="&#8378;">Turkish lira</option>
                    <option value="&#8361;">Won</option>
                    <option value="&#165;">Yen</option>
                    <option value="&#20803;">Yuan</option>
                    <option value="zl">Zloty</option>
                </select>
                <button type="submit" className="submit" onClick={()=> handleCurrency(currency)}>Set currency</button>
            </div>
            <div className="balanceWrapper">
                <div className="balance">Balance:</div>
                <div className="balanceAmount amount">{retrieveCur} {balance}</div>
            </div>
            
        </>
        
    );
}
 
export default Balance;