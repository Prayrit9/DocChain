const fs = require('fs');
const path = require('path');
const { default: ArLocal } = require('arlocal');
const Arweave = require('arweave');
const { LoggerFactory, SmartWeaveNodeFactory } = require('redstone-smartweave');

describe('Testing the doc contract', () => {
    let contractSrc,
      initialState,
      wallet,
      arweave,
      arlocal,
      smartweave,
      contract,
      walletAddress;
    let asset = '';
    const MOCK_ADDRESS = '0x1234',
      MOCK_ADDRESS_2 = '0x5678';
  
    beforeAll(async () => {
      arlocal = new ArLocal(1985, false);
      await arlocal.start();
  
      arweave = Arweave.init({
        host: 'localhost',
        port: 1985,
        protocol: 'http',
      });
  
      LoggerFactory.INST.logLevel('error');
  
      smartweave = SmartWeaveNodeFactory.memCachedBased(arweave).build();
      wallet = await arweave.wallets.generate();
      walletAddress = await arweave.wallets.jwkToAddress(wallet);
  
      await addFunds(arweave, wallet);
  
      contractSrc = fs.readFileSync(
        path.join(__dirname, 'esuraksha-cu/contracts/contract.js'),
        'utf8'
      );
      initialState = fs.readFileSync(
        path.join(__dirname, 'esuraksha-cu/contracts/contract.json'),
        'utf8'
      );
  
      const contractTxId = await smartweave.createContract.deploy({
        wallet,
        initState: initialState,
        src: contractSrc,
      });
  
      contract = smartweave.contract(contractTxId);
      contract.connect(wallet);
  
      await mineBlock(arweave);
    });
  
    afterAll(async () => {
      await arlocal.stop();
    });


    it('Should have no data right after deployment', async () => {
      const { state } = await contract.readState();
      expect(state.data).toEqual({});
    });
  
   
  });
  