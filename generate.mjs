
import WalletManagerBtc from '@tetherto/wdk-wallet-btc';
import { generateMnemonic } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english.js';
// Generate a cryptographically secure 12-word BIP39 phrase
const mnemonic = generateMnemonic(wordlist, 128);

const wallet = new WalletManagerBtc(mnemonic, {
  network: 'testnet',
  bip: 84
});

try {
  const account = await wallet.getAccount(0);
  const address = await account.getAddress();

  console.log('\n=== NEW BITCOIN TESTNET WALLET ===');
  console.log('Recovery phrase:', mnemonic);
  console.log('Bitcoin address:', address);
  console.log('Derivation path:', account.path);
  console.log('\nIMPORTANT: TESTNET ONLY. DO NOT USE FOR REAL FUNDS.');
} finally {
  wallet.dispose();
}
