import QRCode from 'qrcode';
import './App.css'
import { useEffect, useState} from 'react';
const Qr = ( {text} ) => {
  const [src, setSrc] = useState( ' ');

  useEffect(() => {
    QRCode.toDataURL(text).then((data) => {
      setSrc(data);
    });
  }, [])
  return <div class="center">
    <p><img src={src} /></p>
    </div>;
};


export default Qr;