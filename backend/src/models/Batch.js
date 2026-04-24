const supabase = require('../config/supabaseClient');

/**
 * Batch Model — maps to `batches` table
 */

exports.getBatchesByCourse = async (courseId) => {
  const { data, error } = await supabase
    .from('batches')
    .select('*')
    .eq('course_id', courseId)
    .order('start_date', { ascending: true });
  if (error) throw error;
  return data;
};

exports.getAllBatches = async () => {
  const { data, error } = await supabase
    .from('batches')
    .select('*, courses(id, title)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

exports.createBatch = async (batchData) => {
  const { data, error } = await supabase.from('batches').insert(batchData).select().single();
  if (error) throw error;
  return data;
};

exports.updateBatch = async (batchId, updates) => {
  const { data, error } = await supabase.from('batches').update(updates).eq('id', batchId).select().single();
  if (error) throw error;
  return data;
};

exports.deleteBatch = async (batchId) => {
  const { error } = await supabase.from('batches').delete().eq('id', batchId);
  if (error) throw error;
  return true;
};
