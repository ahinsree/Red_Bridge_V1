const fs = require('fs');
const path = require('path');

const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Ahinsree B
ORG:Red Bridge Advisory
TITLE:Associate Director, Experience Practice
TEL:+919061211135
EMAIL:contact@redbridgeadvisory.com
URL:https://www.redbridgeadvisory.com
ADR:;;Dotspace Business Center, TC 24/3088/2, Ushasandya Building, Devasom Board Road, Kowdiar, Thiruvananthapuram;Kerala;;695003;India
END:VCARD`;

const encodedData = encodeURIComponent(vCardData);
const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodedData}`;

console.log('Downloading Ahinsree QR code...');

fetch(qrUrl)
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.arrayBuffer();
  })
  .then(buffer => {
    const outputPath = path.join(__dirname, '../public/images/ahinsree-qr.png');
    // Ensure parent dir exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(outputPath, Buffer.from(buffer));
    console.log('Ahinsree QR Code downloaded and saved successfully to:', outputPath);
  })
  .catch(err => {
    console.error('Error downloading QR code:', err);
    process.exit(1);
  });
