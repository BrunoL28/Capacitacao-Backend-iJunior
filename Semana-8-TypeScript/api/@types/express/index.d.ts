import { PayloadParams } from "../../src/domains/Usuarios/types/PayloadParams";

declare global {
    namespace Express {
        interface Request {
            user?: PayloadParams
        }
    }
}