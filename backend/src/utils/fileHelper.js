const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

/**
 * Saves a multer file buffer to the uploads directory
 * @param {Object} file - Multer file object
 * @returns {String} - The saved filename
 */
exports.saveFile = async (file) => {
  if (!file || !file.buffer) return null;
  
  const uploadsDir = path.join(__dirname, '../../public/uploads');
  
  // Ensure directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  
  const ext = path.extname(file.originalname) || '.jpg';
  const filename = `${file.fieldname}-${Date.now()}${ext}`;
  const filePath = path.join(uploadsDir, filename);
  
  await writeFile(filePath, file.buffer);
  
  return filename;
};
