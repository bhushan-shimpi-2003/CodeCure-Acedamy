const supabase = require('../config/supabaseClient');

/**
 * Transaction Model — maps to `transactions` table
 * Source: AdminFinance.tsx (type: credit/debit, description, amount, date)
 *         Revenue MTD, Pending Dues, Total Payouts stats
 */

exports.createTransaction = async (txnData) => {
  const { data, error } = await supabase.from('transactions').insert(txnData).select().single();
  if (error) throw error;
  return data;
};

exports.getAllTransactions = async () => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

exports.getTransactionsByType = async (type) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('type', type)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};
