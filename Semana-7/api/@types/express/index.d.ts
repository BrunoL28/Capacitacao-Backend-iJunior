import { PayloadParams } from '../../src/domains/usuarios/types/PayloadParams';

declare global {
    namespace Express {
        interface Request {
            usuario?: PayloadParams;
        }
    }
}