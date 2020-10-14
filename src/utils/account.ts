import { Wallet, utils, Contract, BigNumber } from 'ethers';

import * as config from '../config.json';
import { domainData, domainType, metaTransactionType } from '../types';

const abi = require('../contracts/Rocket.json').abi;
const IRocketContract = new utils.Interface(abi);

export const balance = async (address: string, token: string, client: any) => {
  if (!(address && token && client)) {
    return '0';
  }
  try {
    return (utils.formatUnits(await client.balanceOfERC20(address, token, {}), 1))
  } catch (e) {
    console.log(e);
    return '0';
  }
};

export const send = async (wallet: Wallet, biconomyProvider: any) => {
  if (!(wallet && biconomyProvider)) return Error;

  const RocketContract = new Contract(config.posChildERC20, abi, biconomyProvider);
  const functionSignature = IRocketContract.encodeFunctionData('transfer', ['0x0B510F42fF8497254B006C2Ae9c85B3F831f052E', BigNumber.from('1')]);
  console.log(`Set function sig: ${functionSignature}`);

  console.log(`Fetching nonce`);
  const nonce = await RocketContract.getNonce(wallet.address);
  console.log(`Got nonce: ${nonce}`);

  const message = {
    nonce,
    from: wallet.address,
    functionSignature
  };

  const dataToSign = JSON.stringify({
    types: {
        EIP712Domain: domainType,
        MetaTransaction: metaTransactionType
      },
    domain: domainData,
    primaryType: "MetaTransaction",
    message: message
  });

  const signedMsg = await wallet.signMessage(dataToSign);
  console.log(signedMsg);


  const sigParams = utils.splitSignature(signedMsg);
  console.log(sigParams.r,sigParams.s,sigParams.v);

  console.log(RocketContract.provider);
  console.log(RocketContract.signer);
  console.log('Sending');
  /*
  const receipt = await RocketContract.executeMetaTransaction(
    wallet.address,
    signedMsg,
    sigParams.r,
    sigParams.s,
    sigParams.v,
    {
      from: wallet.address
    }
  )

  console.log(receipt);
  */
};



const directSend = (wallet: Wallet, signedMsg: string, sigParams: any) => {
  try {
          fetch(`https://api.biconomy.io/api/v2/meta-tx/native`, {
            method: "POST",
            headers: {
              "x-api-key" : "PHObqJvg2.478df731-9031-4d8a-84a9-620c09d87c9f",
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
              "to": "0xabc7eb97bae5fea8b789e0609713830e086ff36e",
              "apiId": "bd52ca61-704c-4430-bb1f-77e149eafae0",
              "params": [
                wallet.address, signedMsg, sigParams.r, sigParams.s, sigParams.v
              ],
              "from": wallet.address
            })
          })
          .then(console.log)
          .then(function(result) {
            console.log(result);
          })
          .catch(function(error) {
            console.log(error)
          });
        } catch (error) {
          console.log(error);
        }
}
