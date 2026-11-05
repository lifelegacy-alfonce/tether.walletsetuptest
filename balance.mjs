
const address = process.env.WALLET_ADDRESS;

if (!address || !address.startsWith('tb1')) {
  throw new Error('Please provide a valid Bitcoin testnet address.');
}

const url = `https://blockstream.info/testnet/api/address/${address}`;

async function checkBalance() {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();

  const confirmed =
    data.chain_stats.funded_txo_sum -
    data.chain_stats.spent_txo_sum;

  const unconfirmed =
    data.mempool_stats.funded_txo_sum -
    data.mempool_stats.spent_txo_sum;

  const total = confirmed + unconfirmed;

  console.log('\n=== BITCOIN TESTNET BALANCE ===');
  console.log('Address:', address);
  console.log('Confirmed:', confirmed, 'satoshis');
  console.log('Unconfirmed net:', unconfirmed, 'satoshis');
  console.log('Total:', total, 'satoshis');
  console.log('Total BTC:', (total / 100000000).toFixed(8));
}

checkBalance().catch(console.error);
