import { ActInquiryResponse, StartTransactionResponse } from "../api/generated/types";
import { User } from "../redux/user/types";

const USER : User = {
    name: "Emanuele",
    email: "Emanuele@pagopa.it",
    uid: "0000-0001",
    role: ""
}

//* Return code. * 0 -> OK * 1 -> QrCode/CF non valido/i * 2 -> Documenti non più disponibili * 3 -> Stampa già eseguita * 99 -> KO 
const ACT_INQUIRY_RESPONSES = {
    ACT_INQUIRY_OK: {
        result: true,
        status: {
            code: 0,
            message: "OK"
        }
    },
    ACT_INQUIRY_KO: {
        result: false,
        status: {
            code: 99,
            message: "KO"
        }
    },
    ACT_INQUIRY_INVALID_DATA: {
        result: false,
        status: {
            code: 1,
            message: "QrCode/CF non valido/i"
        }
    },
    ACT_INQUIRY_UNAVAILABLE_DOC: {
        result: false,
        status: {
            code: 2,
            message: "Documenti non più disponibili"
        }
    },
    ACT_INQUIRY_ALREADY_PRINTED: {
        result: false,
        status: {
            code: 3,
            message: "Stampa già eseguita"
        }
    }
}

const UPLOAD = {
    UPLOAD_OK : {
        url: import.meta.env.VITE_API_BASE_PATH + "/mock/upload-s3",
        secret: "secret",
        fileKey: "testFileKey",
        status: {
            code: 0,
            message: "OK"
        }
    },
    S3_OK : {
        
    }
}

const ACT_TRANSACTION = {
    START_ACT_TRANSACTION_OK : {
        urlList: [
            "http://web.pagopa.dev.it/notifiche/act/act1.pdf",
            "http://web.pagopa.dev.it/notifiche/act/act2.pdf",
            "http://web.pagopa.dev.it/notifiche/act/act3.pdf"
        ],
        status: {
            code: 0,
            message: ""
        }
    },
    START_ACT_TRANSACTION_OK_WITH_RETRY : (retryAfter: number = 5000) => ({
        urlList: [],
        status: {
            code: 2,
            message: "Retry please.",
            retryAfter
        }
    }),
    COMPLETE_ACT_TRANSACTION_OK : {
        status: {
            code: 0,
            message: ""
        }
    }
}


export default { ACT_INQUIRY_RESPONSES, USER, ACT_TRANSACTION, UPLOAD }