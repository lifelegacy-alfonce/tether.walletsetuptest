import WalletManagerBtc from '@tetherto/wdk-wallet-btc'

const seedPhrase = process.env.WALLET_MNEMONIC

if (!seedPhrase) {
  throw new Error('WALLET_MNEMONIC environment variable is missing')
}

const wallet = new WalletManagerBtc(seedPhrase, {
  network: 'testnet',
  bip: 84
})

try {
  const account = await wallet.getAccount(0)
  const address = await account.getAddress()

  console.log('Bitcoin testnet wallet address:', address)
  console.log('Derivation path:', account.path)
} catch (error) {
  console.error('Wallet error:', error.message)
} finally {
  wallet.dispose()
}