const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'src/components/admin/views');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  { regex: /font-mono/g, replace: '' },
  { regex: /bg-\[#0a0a0a\]/g, replace: 'bg-white' },
  { regex: /bg-\[#050505\]/g, replace: 'bg-slate-50' },
  { regex: /bg-\[#111\]/g, replace: 'bg-slate-200' },
  { regex: /border-emerald-500\/30/g, replace: 'border-slate-200' },
  { regex: /border-emerald-500\/20/g, replace: 'border-slate-100' },
  { regex: /border-emerald-900\/50/g, replace: 'border-slate-100' },
  { regex: /border-emerald-900\/30/g, replace: 'border-slate-100' },
  { regex: /border-emerald-900/g, replace: 'border-slate-200' },
  { regex: /border-emerald-500/g, replace: 'border-blue-600' },
  { regex: /text-emerald-500/g, replace: 'text-blue-600' },
  { regex: /text-emerald-400/g, replace: 'text-slate-900' },
  { regex: /text-emerald-200/g, replace: 'text-slate-800' },
  { regex: /text-emerald-600/g, replace: 'text-slate-500' },
  { regex: /text-emerald-700/g, replace: 'text-slate-500' },
  { regex: /text-emerald-800/g, replace: 'text-slate-400' },
  { regex: /text-emerald-900/g, replace: 'text-slate-300' },
  { regex: /bg-emerald-500\/10/g, replace: 'bg-blue-50' },
  { regex: /bg-emerald-500\/20/g, replace: 'bg-blue-100' },
  { regex: /bg-emerald-500/g, replace: 'bg-blue-600' },
  { regex: /hover:bg-emerald-400/g, replace: 'hover:bg-blue-700' },
  { regex: /hover:bg-emerald-900\/30/g, replace: 'hover:bg-slate-100' },
  { regex: /hover:bg-emerald-950\/20/g, replace: 'hover:bg-slate-50' },
  { regex: /hover:bg-emerald-950\/10/g, replace: 'hover:bg-slate-50' },
  { regex: /hover:border-emerald-500\/50/g, replace: 'hover:border-blue-300' },
  { regex: /hover:border-emerald-500\/60/g, replace: 'hover:border-blue-300' },
  { regex: /hover:border-emerald-400/g, replace: 'hover:border-blue-400' },
  { regex: /hover:border-emerald-900\/30/g, replace: 'hover:border-slate-300' },
  { regex: /hover:text-emerald-400/g, replace: 'hover:text-blue-700' },
  { regex: /hover:text-emerald-500/g, replace: 'hover:text-blue-600' },
  { regex: /focus-within:border-emerald-500/g, replace: 'focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500' },
  { regex: /focus:border-emerald-500/g, replace: 'focus:border-blue-500 focus:ring-1 focus:ring-blue-500' },
  { regex: /text-black/g, replace: 'text-white' },
  { regex: /rounded-none/g, replace: 'rounded-xl' },
  { regex: /shadow-\[0_0_10px_rgba\(16,185,129,0\.3\)\]/g, replace: 'shadow-sm' },
  { regex: /shadow-\[0_0_10px_rgba\(16,185,129,0\.8\)\]/g, replace: 'shadow-sm' },
  { regex: /shadow-\[0_0_15px_rgba\(16,185,129,0\.05\)\]/g, replace: 'shadow-sm' },
  { regex: /text-white/g, replace: 'text-slate-900' },
  { regex: /uppercase/g, replace: '' },
  { regex: /Terminal/g, replace: 'LayoutDashboard' },
  { regex: /bg-amber-500\/10 text-amber-400 border-amber-500\/30/g, replace: 'bg-amber-50 text-amber-700 border-amber-200' },
  { regex: /bg-slate-500\/10 text-slate-400 border-slate-500\/30/g, replace: 'bg-slate-100 text-slate-700 border-slate-200' },
  { regex: /bg-red-950\/10 border-red-500\/30/g, replace: 'bg-red-50 border-red-200' },
  { regex: /bg-red-950\/30 border-red-500\/50/g, replace: 'bg-red-100 border-red-300' },
  { regex: /text-red-400/g, replace: 'text-red-600' },
  { regex: /text-red-500/g, replace: 'text-red-600' },
  { regex: /bg-emerald-700/g, replace: 'bg-white' },
  { regex: /fill-emerald-500/g, replace: 'fill-amber-400' },
  { regex: /text-emerald-500/g, replace: 'text-amber-400' }, // for stars? wait, text-emerald-500 is already replaced. Let's fix order.
];

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Custom replacements for stars
  content = content.replace(/text-emerald-500 fill-emerald-500/g, 'text-amber-400 fill-amber-400');
  content = content.replace(/text-blue-600 fill-amber-400/g, 'text-amber-400 fill-amber-400'); // if already replaced

  replacements.forEach(({ regex, replace }) => {
    content = content.replace(regex, replace);
  });
  
  // Clean up multiple spaces
  content = content.replace(/  +/g, ' ');
  content = content.replace(/class=" /g, 'class="');
  content = content.replace(/className=" /g, 'className="');
  
  // Fix specific text colors that might have been messed up
  content = content.replace(/text-slate-900 text-sm/g, 'text-slate-900 text-sm font-medium');
  
  fs.writeFileSync(filePath, content);
  console.log(`Processed ${file}`);
});
