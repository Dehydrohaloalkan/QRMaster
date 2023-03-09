import { Qrcode } from '../services/SQLite.service';

export type RootStackParamList = {
    ScanCode: void,
    GenerateCode: void,
    History: void,
    OpenQRCode: {QRCode: Qrcode},
}