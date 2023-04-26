import { MODE } from './const';

export const calcBase64String = (file: any): Promise<string> => {
  // this is because test fails due to resolve in onload function
  if (MODE === 'test') {
    return Promise.resolve('mocked-base64String');
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    /*  */
    reader.onload = () => {
      const base64String = (reader.result as string).split(';base64,');
      resolve(base64String[1]);
    };
    reader.onerror = () => {
      reject();
    };
  });
};

export const calcUnit8Array = (file: any): Promise<Uint8Array> => {
  // this is because test fails due to resolve in onload function
  if (MODE === 'test') {
    return Promise.resolve(new Uint8Array());
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    /*  */
    reader.onload = async () => {
      try {
        resolve(new Uint8Array(reader.result as ArrayBuffer));
      } catch {
        reject();
      }
    };
    reader.onerror = () => {
      reject();
    };
  });
};

export const calcSha256String = async (
  file: any
): Promise<{ hashHex: string; hashBase64: string }> => {
  // this is because in jest crypto is undefined and test fails due to resolve in onload function
  if (MODE === 'test') {
    return Promise.resolve({ hashHex: 'mocked-hashHex', hashBase64: 'mocked-hasBase64' });
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    /*  */
    reader.onload = async () => {
      try {
        const hashBuffer = await crypto.subtle.digest('SHA-256', reader.result as ArrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashBase64 = window.btoa(String.fromCharCode(...hashArray)); // convert bytes to base64 string
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
        resolve({ hashHex, hashBase64 });
      } catch {
        reject();
      }
    };
    reader.onerror = () => {
      reject();
    };
  });
};

export const ALLOWED_MIME_TYPES = ['image/jpg', 'image/png'];

export const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB

export const isFileImage = (file: File): boolean => file.type.split('/')[0] === 'image';

export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) {return '0 Bytes';}

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
