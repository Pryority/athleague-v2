import { useState } from 'react';
import { ethers } from 'ethers';

function WalletBalance() {
    const [balance, setBalance] = useState(null);

    const getBalance = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);
        setBalance(ethers.utils.formatEther(balance));
    };

    return (
        <div id='wallet-balance'>
            <div className='flex flex-col space-y-4'>
                <h5>Balance: {balance}</h5>
                <button className='p-2 px-4 rounded-lg border-2 border-slate-300 bg-blue-400  font-bold text-md'
                    onClick={() => getBalance()}
                >Show My Balance</button>
            </div>
        </div >
    )
};

export default WalletBalance