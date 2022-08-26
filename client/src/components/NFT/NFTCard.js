// import { useEffect, useState } from "react";
// import { ethers } from 'ethers';
// import Contract from '../../artifacts/contracts/CourseTokens.sol/CourseTokens.json';

// const CONTRACT_ADDRESS = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
// const provider = new ethers.providers.Web3Provider(window.ethereum);
// const signer = provider.getSigner();
// const contract = new ethers.Contract(CONTRACT_ADDRESS, Contract.abi, signer);


// function NFTCard({ tokenId, getCount }) {
//     const contentId = ''; // IPFS hash (example: QmS7g9gdD7976ggjdD78S4jN90G8dfds0llGoD8)
//     const metadataURI = `${contentId}/${tokenId}.json`;
//     const imageURI = `img/${tokenId}.png`

//     const [isMinted, setIsMinted] = useState(false);

//     const getMintedStatus = async () => {
//         const result = await contract.isContentOwned(metadataURI);
//         console.log(result)
//         setIsMinted(result);
//     };

//     const mintToken = async () => {
//         const connection = await contract.connect(signer);
//         const addr = connection.address;
//         const result = await contract.mintCourseToken(addr, metadataURI, { value: ethers.utils.parseEther('0.005') });

//         await result.wait();
//         getMintedStatus();
//     }

//     async function getURI() {
//         const uri = await contract.tokenURI(tokenId);
//     }

//     useEffect(() => {
//         getMintedStatus();
//     }, [isMinted])


//     return (
//         <div className="flex flex-col space-y-4 items-center justify-center p-2 rounded-lg w-full bg-slate-400 ">
//             <div>Activity Token</div>
//             {!isMinted ? (
//                 <button className='p-2 w-2/3 font-bold bg-lime-400 border-2 border-slate-600 rounded-lg'
//                     onClick={() => {
//                         console.log('hello world, minting a token')
//                         // mintToken();

//                     }}
//                 >Mint</button>
//             ) :
//                 (
//                     <button className='p-2 w-2/3 font-bold bg-lime-400 border-2 border-slate-600 rounded-lg'
//                         onClick={() => {
//                             console.log('hello world, minting a token')
//                             mintToken();
//                             tokenId++
//                         }}
//                     >Taken</button>
//                 )
//             }

//         </div>
//     )
// }

// export default NFTCard