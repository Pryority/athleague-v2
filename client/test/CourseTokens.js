const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Course Tokens', function () {
    it('Should mint and transfer an NFT to someone', async function () {
        const CourseTokens = await ethers.getContractFactory('CourseTokens');
        const courseTokens = await CourseTokens.deploy();
        await courseTokens.deployed();

        const recipient = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
        const metadataURI = 'cid/test.png';

        let balance = await courseTokens.balanceOf(recipient);
        expect(balance).to.equal(0);

        const newlyMintedToken = await courseTokens.mintCourseToken(recipient, metadataURI, { value: ethers.utils.parseEther('0.005') });

        await newlyMintedToken.wait();
        balance = await courseTokens.balanceOf(recipient);

        expect(balance).to.equal(1);
        expect(await courseTokens.isContentOwned(metadataURI)).to.equal(true);
    })
})