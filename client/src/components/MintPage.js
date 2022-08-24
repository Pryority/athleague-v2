import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import Contract from '../artifacts/contracts/CourseTokens.sol/CourseTokens.json';
import NFTImage from './NFT/NFTCard';
import trail from '../assets/images/trail.png'

const CONTRACT_ADDRESS = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, Contract.abi, signer);

function MintPage() {

    const [tokenCount, setTokenCount] = useState(0);

    const getCount = async () => {
        const count = await contract.count();
        setTokenCount(count);
    };

    useEffect(() => {
        getCount();
    }, []);

    return (
        <div className='flex flex-col w-full h-full items-center justify-center'>
            <div className='flex flex-col w-full h-1/6 items-center justify-center bg-stone-300'>
                <div className='flex w-full justify-center h-full items-center'>Mint Your Activity Token</div>
            </div>
            <div className='flex w-full bg-red-300 justify-center items-center'>
                <p>Token Count: {tokenCount}</p>
            </div>
            <div className='flex w-full bg-orange-300 justify-center items-center'>
                <button className='p-2 w-2/3 font-bold bg-lime-400 border-2 border-slate-600 rounded-lg '
                    onClick={() => {
                        console.log('hello world, minting a token')
                        // mintToken();
                        setTokenCount(tokenCount + 1)
                    }}
                >Mint</button>
            </div>
            <div className='flex w-full p-4 h-4/6 bg-sky-100'>
                <div className='flex flex-col space-y-4 w-full justify-start items-center overflow-y-scroll p-4 bg-stone-400 rounded-xl'>
                    {Array(tokenCount + 1)
                        .fill(0)
                        .map((_, i) => (
                            <div key={i} className='p-4'>
                                {/* <NFTImage tokenId={i} /> */}
                                <div className="flex flex-col w-full h-full space-y-4 items-center justify-center rounded-3xl">
                                    <div className='flex flex-col h-full w-64 bg-clip-border justify-center items-center bg-blue-300 p-2 rounded-2xl'>
                                        <div className='flex w-full'>
                                            <p className='font-bold'>Course Token</p>
                                        </div>
                                        <div className='flex w-full items-center justify-center py-2'>
                                            <img src={trail} className='flex w-full object-fill rounded-xl' alt='demo' />
                                        </div>
                                        <div className='flex flex-col w-full items-center justify-center  space-y-1 bg-green-400'>
                                            <div className='flex flex-col w-full justify-start items-start bg-stone-50 p-2 px-4 rounded-2xl'>Completions: 5</div>
                                            <div className='flex flex-col w-full justify-start items-start bg-stone-50 p-2 px-4 rounded-2xl'>Streak: 5</div>
                                            <div className='flex flex-col w-full justify-start items-start bg-stone-50 p-2 px-4 rounded-2xl'>Expires: July 24, 2023</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
export default MintPage
